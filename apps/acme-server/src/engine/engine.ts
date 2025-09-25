import type {
  Mission,
  ModuleStatus,
  ProcessingModule,
  ProcessingRecipe,
  ProductType,
  RecipeInputs,
  RecipeOutputs,
  SimulationConfig,
  SimulationResults,
  WasteMaterial,
} from '@acme/db/types'

// Core simulation types
export interface SimulationState {
  timestep: number
  day: number
  inventory: Record<string, number> // materialId -> kg
  products: Record<string, { units: number; totalMassKg: number }>
  metrics: {
    energyKwh: number
    crewHours: number
    waterLiters: number
    recoveredKg: number
    wasteProcessedKg: number
  }
  moduleStates: Record<
    string,
    {
      status: ModuleStatus
      currentLoad: number
      maintenanceHours: number
    }
  >
}

export interface SimulationStep {
  stepIndex: number
  timestamp: Date
  snapshot: SimulationState
  events: Array<{
    type: 'waste_collection' | 'processing' | 'product_creation' | 'maintenance'
    description: string
    materialsInvolved: string[]
    energyUsedKwh?: number
    crewTimeMinutes?: number
  }>
}

export interface ProcessExecution {
  recipeId: string
  moduleId: string
  inputMaterials: Record<string, number> // materialId -> kg
  outputProducts: Array<{
    productType: ProductType
    units: number
    massKg: number
  }>
  energyKwh: number
  crewMinutes: number
  processingTimeMinutes: number
}

export interface OptimizerConfig {
  mode: 'greedy' | 'genetic' | 'milp'
  constraints?: {
    maxDailyEnergyKwh?: number
    maxCrewHoursPerDay?: number
    maxWaterLitersPerDay?: number
  }
  objectives: {
    maximizeRecovery: number // weight 0-1
    minimizeEnergy: number // weight 0-1
    minimizeCrew: number // weight 0-1
    maximizeUtility: number // weight 0-1
  }
  geneticParams?: {
    population: number
    generations: number
    mutationRate: number
    crossoverRate: number
    seed?: number
  }
}

export class MarsWasteSimulator {
  private mission: Mission
  private materials: Map<string, WasteMaterial>
  private modules: Map<string, ProcessingModule>
  private recipes: Map<string, ProcessingRecipe>
  private random: () => number

  constructor(
    mission: Mission,
    materials: WasteMaterial[],
    modules: ProcessingModule[],
    recipes: ProcessingRecipe[],
    seed?: number,
  ) {
    this.mission = mission
    this.materials = new Map(materials.map((m) => [m.id, m]))
    this.modules = new Map(modules.map((m) => [m.id, m]))
    this.recipes = new Map(recipes.map((r) => [r.id, r]))

    // Simple seeded PRNG for deterministic results
    if (seed !== undefined) {
      let s = seed
      this.random = () => {
        s = (Math.imul(s, 1664525) + 1013904223) | 0
        return (s >>> 0) / 0x100000000
      }
    } else {
      this.random = Math.random
    }
  }

  simulate(config: SimulationConfig): SimulationResults {
    const state = this.initializeState(config)
    const steps: SimulationStep[] = []
    const timeline: SimulationResults['timeline'] = []

    const totalDays = config.mission_duration_days || this.mission.mission_duration_days || 365
    const hoursPerStep = 24 // Daily simulation steps

    for (let day = 0; day < totalDays; day++) {
      state.day = day

      // Generate new waste for this day
      this.generateDailyWaste(state, config)

      // Run optimizer to determine what to process today
      const dailyPlan = this.optimizeDaily(state, config)

      // Execute the daily plan
      const dayEvents = this.executeDailyPlan(state, dailyPlan, config)

      // Update module maintenance
      this.updateModuleMaintenance(state, config)

      // Record step if significant changes or every 7 days
      if (dayEvents.length > 0 || day % 7 === 0) {
        const step: SimulationStep = {
          events: dayEvents,
          snapshot: JSON.parse(JSON.stringify(state)),
          stepIndex: day,
          timestamp: new Date(Date.now() + day * 24 * 60 * 60 * 1000),
        }
        steps.push(step)
      }

      // Record timeline events
      if (dayEvents.length > 0) {
        timeline.push({
          day,
          events: dayEvents,
        })
      }
    }

    return this.generateResults(state, steps, timeline, config)
  }

  private initializeState(config: SimulationConfig): SimulationState {
    const inventory: Record<string, number> = {}

    // Initialize with available materials
    for (const [materialId, rate] of Object.entries(config.waste_generation_rates || {})) {
      inventory[materialId] = 0 // Will be generated daily
    }

    const moduleStates: Record<string, any> = {}
    for (const moduleId of config.available_modules || []) {
      moduleStates[moduleId] = {
        currentLoad: 0,
        maintenanceHours: 0,
        status: 'active' as ModuleStatus,
      }
    }

    return {
      day: 0,
      inventory,
      metrics: {
        crewHours: 0,
        energyKwh: 0,
        recoveredKg: 0,
        wasteProcessedKg: 0,
        waterLiters: 0,
      },
      moduleStates,
      products: {},
      timestep: 0,
    }
  }

  private generateDailyWaste(state: SimulationState, config: SimulationConfig): void {
    for (const [wasteType, rate] of Object.entries(config.waste_generation_rates || {})) {
      // Find materials of this waste type
      const typeMaterials = Array.from(this.materials.values()).filter((m) => m.category === wasteType)

      if (typeMaterials.length > 0) {
        // Distribute waste among materials of this type
        const totalRate = rate * (config.crew_size || this.mission.crew_size || 6)
        typeMaterials.forEach((material) => {
          const materialRate = totalRate / typeMaterials.length
          state.inventory[material.id] = (state.inventory[material.id] || 0) + materialRate
        })
      }
    }
  }

  private optimizeDaily(state: SimulationState, config: SimulationConfig): ProcessExecution[] {
    const executions: ProcessExecution[] = []
    const constraints = config.optimization_goals || {
      maximize_utility: 0.3,
      minimize_crew_time: 0.2,
      minimize_energy: 0.2,
      minimize_waste: 0.3,
    }

    // Greedy optimization: sort recipes by efficiency score
    const availableRecipes = Array.from(this.recipes.values())
      .filter((recipe) => this.canExecuteRecipe(recipe, state))
      .map((recipe) => ({
        recipe,
        score: this.calculateRecipeScore(recipe, constraints),
      }))
      .sort((a, b) => b.score - a.score)

    const dailyEnergyLimit = config.energy_constraints?.max_daily_kwh || 100
    const dailyCrewLimit = (config.crew_size || 6) * 8 // 8 hours per crew member

    let usedEnergy = 0
    let usedCrew = 0

    for (const { recipe } of availableRecipes) {
      // Try to execute this recipe as much as possible
      while (this.canExecuteRecipe(recipe, state) && usedEnergy < dailyEnergyLimit && usedCrew < dailyCrewLimit) {
        const execution = this.planRecipeExecution(recipe, state, config)
        if (!execution) break

        // Check if we can afford this execution
        if (
          usedEnergy + execution.energyKwh > dailyEnergyLimit ||
          usedCrew + execution.crewMinutes / 60 > dailyCrewLimit
        ) {
          break
        }

        executions.push(execution)
        usedEnergy += execution.energyKwh
        usedCrew += execution.crewMinutes / 60

        // Temporarily deduct materials to prevent over-allocation
        for (const [materialId, amount] of Object.entries(execution.inputMaterials)) {
          state.inventory[materialId] -= amount
        }
      }
    }

    // Restore inventory for actual execution
    for (const execution of executions) {
      for (const [materialId, amount] of Object.entries(execution.inputMaterials)) {
        state.inventory[materialId] += amount
      }
    }

    return executions
  }

  private calculateRecipeScore(recipe: ProcessingRecipe, objectives: any): number {
    const inputs = recipe.inputs as RecipeInputs
    const outputs = recipe.outputs as RecipeOutputs

    const totalInputKg = Object.values(inputs).reduce((sum, input) => sum + input.quantity_kg, 0)
    const totalOutputKg = Object.values(outputs).reduce((sum, output) => sum + output.quantity_kg, 0)

    const massEfficiency = totalOutputKg / Math.max(totalInputKg, 0.001)
    const energyEfficiency = totalOutputKg / Math.max(Number(recipe.energy_required_kwh), 0.001)
    const crewEfficiency = totalOutputKg / Math.max(recipe.crew_time_minutes || 1, 1)
    const yieldScore = recipe.yield_percentage || 0.8
    const qualityScore = recipe.quality_score || 1.0

    return (
      (massEfficiency * objectives.minimize_waste +
        energyEfficiency * objectives.minimize_energy +
        crewEfficiency * objectives.minimize_crew_time +
        yieldScore * qualityScore * objectives.maximize_utility) /
      4
    )
  }

  private canExecuteRecipe(recipe: ProcessingRecipe, state: SimulationState): boolean {
    const inputs = recipe.inputs as RecipeInputs

    for (const [materialId, requirement] of Object.entries(inputs)) {
      const available = state.inventory[materialId] || 0
      if (available < requirement.quantity_kg) {
        return false
      }
    }

    return true
  }

  private planRecipeExecution(
    recipe: ProcessingRecipe,
    state: SimulationState,
    config: SimulationConfig,
  ): ProcessExecution | null {
    const inputs = recipe.inputs as RecipeInputs
    const outputs = recipe.outputs as RecipeOutputs

    // Find available module
    const availableModuleId = config.available_modules?.find((moduleId) => {
      const module = this.modules.get(moduleId)
      const moduleState = state.moduleStates[moduleId]
      return module && moduleState?.status === 'active'
    })

    if (!availableModuleId) return null

    const inputMaterials: Record<string, number> = {}
    let limitingFactor = 1.0

    // Calculate how much we can actually process based on available materials
    for (const [materialId, requirement] of Object.entries(inputs)) {
      const available = state.inventory[materialId] || 0
      const needed = requirement.quantity_kg
      if (available < needed) {
        limitingFactor = Math.min(limitingFactor, available / needed)
      }
    }

    if (limitingFactor <= 0) return null

    // Scale inputs by limiting factor
    for (const [materialId, requirement] of Object.entries(inputs)) {
      inputMaterials[materialId] = requirement.quantity_kg * limitingFactor
    }

    // Calculate outputs
    const outputProducts = Object.entries(outputs).map(([productType, output]) => ({
      massKg: output.quantity_kg * limitingFactor * (recipe.yield_percentage || 0.8),
      productType: productType as ProductType,
      units: Math.floor(output.quantity_kg * limitingFactor * (recipe.yield_percentage || 0.8)),
    }))

    return {
      crewMinutes: (recipe.crew_time_minutes || 0) * limitingFactor,
      energyKwh: Number(recipe.energy_required_kwh) * limitingFactor,
      inputMaterials,
      moduleId: availableModuleId,
      outputProducts,
      processingTimeMinutes: recipe.processing_time_minutes * limitingFactor,
      recipeId: recipe.id,
    }
  }

  private executeDailyPlan(state: SimulationState, executions: ProcessExecution[], config: SimulationConfig): any[] {
    const events: any[] = []

    for (const execution of executions) {
      // Consume input materials
      for (const [materialId, amount] of Object.entries(execution.inputMaterials)) {
        state.inventory[materialId] -= amount
        state.metrics.wasteProcessedKg += amount
      }

      // Produce outputs
      for (const output of execution.outputProducts) {
        const productKey = output.productType
        if (!state.products[productKey]) {
          state.products[productKey] = { totalMassKg: 0, units: 0 }
        }
        state.products[productKey].units += output.units
        state.products[productKey].totalMassKg += output.massKg
        state.metrics.recoveredKg += output.massKg
      }

      // Update metrics
      state.metrics.energyKwh += execution.energyKwh
      state.metrics.crewHours += execution.crewMinutes / 60

      // Create event
      events.push({
        crewTimeMinutes: execution.crewMinutes,
        description: `Processed ${Object.entries(execution.inputMaterials)
          .map(([id, kg]) => `${kg.toFixed(1)}kg ${this.materials.get(id)?.name || id}`)
          .join(', ')} → ${execution.outputProducts.map((p) => `${p.units} ${p.productType}`).join(', ')}`,
        energyUsedKwh: execution.energyKwh,
        materialsInvolved: Object.keys(execution.inputMaterials),
        type: 'processing' as const,
      })
    }

    return events
  }

  private updateModuleMaintenance(state: SimulationState, config: SimulationConfig): void {
    // Simple maintenance model - modules need maintenance periodically
    for (const moduleId of Object.keys(state.moduleStates)) {
      const module = this.modules.get(moduleId)
      if (module) {
        const maintenanceHours = Number(module.maintenance_hours_per_day) || 0
        state.metrics.crewHours += maintenanceHours
      }
    }
  }

  private generateResults(
    finalState: SimulationState,
    steps: SimulationStep[],
    timeline: SimulationResults['timeline'],
    config: SimulationConfig,
  ): SimulationResults {
    const totalWasteGenerated = Object.values(config.waste_generation_rates || {}).reduce(
      (sum, rate) => sum + rate * (config.mission_duration_days || 365) * (config.crew_size || 6),
      0,
    )

    const wasteReductionPercentage =
      totalWasteGenerated > 0 ? (finalState.metrics.wasteProcessedKg / totalWasteGenerated) * 100 : 0

    const productsByType: Record<ProductType, number> = {} as any
    for (const [productType, data] of Object.entries(finalState.products)) {
      productsByType[productType as ProductType] = data.units
    }

    return {
      efficiency_metrics: {
        crew_time_per_kg_waste: finalState.metrics.crewHours / Math.max(finalState.metrics.wasteProcessedKg, 1),
        energy_per_kg_waste: finalState.metrics.energyKwh / Math.max(finalState.metrics.wasteProcessedKg, 1),
        waste_to_product_ratio: finalState.metrics.recoveredKg / Math.max(finalState.metrics.wasteProcessedKg, 1),
      },
      products_by_type: productsByType,
      recommendations: this.generateRecommendations(finalState, config),
      timeline,
      total_crew_time_hours: finalState.metrics.crewHours,
      total_energy_used_kwh: finalState.metrics.energyKwh,
      total_products_created: Object.values(finalState.products).reduce((sum, p) => sum + p.units, 0),
      total_waste_processed_kg: finalState.metrics.wasteProcessedKg,
      waste_reduction_percentage: wasteReductionPercentage,
    }
  }

  private generateRecommendations(state: SimulationState, config: SimulationConfig): string[] {
    const recommendations: string[] = []
    const efficiency = state.metrics.recoveredKg / Math.max(state.metrics.wasteProcessedKg, 1)

    if (efficiency < 0.5) {
      recommendations.push('Consider optimizing recipe yields or adding more efficient processing modules')
    }

    if (
      state.metrics.energyKwh >
      (config.energy_constraints?.max_daily_kwh || 100) * (config.mission_duration_days || 365)
    ) {
      recommendations.push('Energy consumption exceeds budget - consider more energy-efficient processes')
    }

    const unusedMaterials = Object.entries(state.inventory)
      .filter(([_, amount]) => amount > 10)
      .map(([id, _]) => this.materials.get(id)?.name || id)

    if (unusedMaterials.length > 0) {
      recommendations.push(
        `Large amounts of unused materials: ${unusedMaterials.join(', ')} - consider developing new recipes`,
      )
    }

    if (recommendations.length === 0) {
      recommendations.push('Simulation completed successfully with good efficiency metrics')
    }

    return recommendations
  }
}

// Utility function to create Sankey diagram data
export function generateSankeyData(
  result: SimulationResults,
  materials: WasteMaterial[],
  recipes: ProcessingRecipe[],
): {
  nodes: Array<{ id: string; name: string; category: string }>
  links: Array<{ source: string; target: string; value: number }>
} {
  const nodes: any[] = []
  const links: any[] = []

  // Add material nodes
  materials.forEach((material) => {
    nodes.push({
      category: 'material',
      id: `material_${material.id}`,
      name: material.name,
    })
  })

  // Add process nodes
  recipes.forEach((recipe) => {
    nodes.push({
      category: 'process',
      id: `process_${recipe.id}`,
      name: recipe.name,
    })
  })

  // Add product nodes
  Object.keys(result.products_by_type).forEach((productType) => {
    nodes.push({
      category: 'product',
      id: `product_${productType}`,
      name: productType.replace('_', ' '),
    })
  })

  // This is simplified - in practice, you'd track actual material flows
  // through the simulation to build accurate links

  return { links, nodes }
}

export default MarsWasteSimulator
