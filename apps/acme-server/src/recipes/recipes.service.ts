import { Inject, Injectable } from '@nestjs/common'
import { and, asc, count, desc, eq, gte, lte, or, type SQL, sql } from 'drizzle-orm'
import type { NodePgDatabase } from 'drizzle-orm/node-postgres'
import { throwError } from '~/common/libs'
import { DrizzleAsyncProvider, schema } from '~/drizzle'
import {
  CreateRecipeDto,
  RecipeFiltersDto,
  RecipeItem,
  RecipeRecommendation,
  RecipesMessagesType,
  RecipeValidation,
  RecommendationFiltersDto,
  UpdateRecipeDto,
  ValidateRecipeDto,
} from './recipes.types'

@Injectable()
export class RecipesService {
  constructor(
    @Inject(DrizzleAsyncProvider)
    private db: NodePgDatabase<typeof schema>,
  ) {}

  async createRecipe(data: CreateRecipeDto, createdBy?: string): Promise<RecipeItem | undefined> {
    try {
      const recipe = await this.db
        .insert(schema.processingRecipes)
        .values({
          ...data,
          created_by: createdBy,
          input_materials: data.input_materials,
          output_products: data.output_products,
        } as never)
        .returning()

      if (!recipe?.length) {
        throwError<RecipesMessagesType>('RECIPE_CREATION_FAILED', 500)
        return
      }

      return this.formatRecipeItem(recipe[0])
    } catch (error) {
      console.log(error)
      throwError<RecipesMessagesType>('RECIPE_CREATION_FAILED', 500)
      return
    }
  }

  async getRecipes(filters: RecipeFiltersDto) {
    try {
      const conditions: SQL = this.buildRecipeFiltersCondition(filters)
      const offset = (filters.page - 1) * filters.limit

      const [{ total }] = await this.db.select({ total: count() }).from(schema.processingRecipes).where(conditions)

      const orderBy = (() => {
        const isDesc = filters.sort_order === 'desc'
        switch (filters.sort_by) {
          case 'name':
            return isDesc ? desc(schema.processingRecipes.name) : asc(schema.processingRecipes.name)
          case 'yield_percentage':
            return isDesc
              ? desc(schema.processingRecipes.yield_percentage)
              : asc(schema.processingRecipes.yield_percentage)
          case 'energy_required_kwh':
            return isDesc
              ? desc(schema.processingRecipes.energy_required_kwh)
              : asc(schema.processingRecipes.energy_required_kwh)
          case 'processing_time_minutes':
            return isDesc
              ? desc(schema.processingRecipes.processing_time_minutes)
              : asc(schema.processingRecipes.processing_time_minutes)
          case 'created_at':
          default:
            return isDesc ? desc(schema.processingRecipes.created_at) : asc(schema.processingRecipes.created_at)
        }
      })()

      const recipes = await this.db
        .select()
        .from(schema.processingRecipes)
        .orderBy(orderBy)
        .limit(filters.limit)
        .offset(offset)
        .where(conditions)

      const formattedRecipes = recipes.map((recipe) => this.formatRecipeItem(recipe))
      const totalPages = Math.ceil(total / filters.limit)

      return {
        items: formattedRecipes,
        pagination: {
          has_next: filters.page < totalPages,
          has_previous: filters.page > 1,
          limit: filters.limit,
          page: filters.page,
          total,
          total_pages: totalPages,
        },
      }
    } catch (error) {
      console.log(error)
      throwError<RecipesMessagesType>('RECIPE_FETCH_FAILED', 500)
      return
    }
  }

  async validateRecipe(id: string, data: ValidateRecipeDto): Promise<RecipeValidation | undefined> {
    try {
      const recipe = await this.db.query.processingRecipes.findFirst({
        where: eq(schema.processingRecipes.id, id),
      })

      if (!recipe) {
        throwError<RecipesMessagesType>('RECIPE_NOT_FOUND', 404)
        return
      }

      const validation = this.performRecipeValidation(recipe, data)
      return validation
    } catch (error) {
      console.log(error)
      throwError<RecipesMessagesType>('RECIPE_VALIDATION_FAILED', 500)
      return
    }
  }

  async getRecipeRecommendations(data: RecommendationFiltersDto): Promise<RecipeRecommendation[] | undefined> {
    try {
      // Get all active recipes
      const recipes = await this.db
        .select()
        .from(schema.processingRecipes)
        .where(eq(schema.processingRecipes.is_active, true))

      const recommendations = recipes
        .map((recipe) => this.calculateRecipeSuitability(recipe, data))
        .filter((rec) => rec.suitability_score > 0.3)
        .sort((a, b) => b.suitability_score - a.suitability_score)
        .slice(0, data.max_results)

      return recommendations
    } catch (error) {
      console.log(error)
      throwError<RecipesMessagesType>('RECIPE_RECOMMENDATIONS_FAILED', 500)
      return
    }
  }

  async deactivateRecipe(id: string) {
    try {
      const recipe = await this.db
        .update(schema.processingRecipes)
        .set({
          is_active: false,
          updated_at: new Date(),
        })
        .where(eq(schema.processingRecipes.id, id))
        .returning()

      if (!recipe?.length) {
        throwError<RecipesMessagesType>('RECIPE_NOT_FOUND', 404)
        return
      }
      return this.formatRecipeItem(recipe[0])
    } catch (error) {
      console.log(error)
      throwError<RecipesMessagesType>('RECIPE_FETCH_FAILED', 500)
      return
    }
  }

  async updateRecipe(id: string, data: UpdateRecipeDto) {
    try {
      const updated = await this.db
        .update(schema.processingRecipes)
        .set({
          ...data,
          inputs: data.input_materials ?? undefined,
          outputs: data.output_products ?? undefined,
          updated_at: new Date(),
        } as never)
        .where(eq(schema.processingRecipes.id, id))
        .returning()

      if (!updated?.length) {
        throwError<RecipesMessagesType>('RECIPE_NOT_FOUND', 404)
        return
      }

      return this.formatRecipeItem(updated[0])
    } catch (error) {
      console.log(error)
      throwError<RecipesMessagesType>('RECIPE_FETCH_FAILED', 500)
      return
    }
  }

  // Helpers
  private buildRecipeFiltersCondition(filters: RecipeFiltersDto): SQL {
    const conditions: SQL[] = []

    if (filters.output_product_type) {
      // output_products JSON has desired product key
      conditions.push(
        sql`${schema.processingRecipes.output_products} ? ${filters.output_product_type}` as unknown as SQL,
      )
    }
    if (filters.input_waste_type) {
      // input_materials JSON has available waste key
      conditions.push(sql`${schema.processingRecipes.input_materials} ? ${filters.input_waste_type}` as unknown as SQL)
    }
    if (filters.min_yield !== undefined) {
      conditions.push(gte(schema.processingRecipes.yield_percentage, filters.min_yield))
    }
    if (filters.max_energy !== undefined) {
      conditions.push(lte(schema.processingRecipes.energy_required_kwh, String(filters.max_energy)))
    }
    if (filters.max_time !== undefined) {
      conditions.push(lte(schema.processingRecipes.processing_time_minutes, filters.max_time))
    }
    if (filters.required_module) {
      // required_modules JSON array contains module
      conditions.push(sql`${schema.processingRecipes.required_modules} ? ${filters.required_module}` as unknown as SQL)
    }
    if (filters.is_active !== undefined) {
      conditions.push(eq(schema.processingRecipes.is_active, filters.is_active))
    }
    if (filters.created_by) {
      conditions.push(eq(schema.processingRecipes.created_by, filters.created_by))
    }

    if (conditions.length === 0) return sql`1=1`
    let whereCond: SQL = conditions[0] as SQL
    for (let i = 1; i < conditions.length; i++) {
      whereCond = and(whereCond, conditions[i]) as unknown as SQL
    }
    return whereCond
  }

  private formatRecipeItem(item: any): RecipeItem {
    return {
      ...item,
      efficiency_score: Number(item.efficiency_score ?? 1),
      energy_required_kwh: Number(item.energy_required_kwh),
      input_materials: item.input_materials,
      output_products: item.output_products,
      processing_time_minutes: Number(item.processing_time_minutes),
      quality_score: Number(item.quality_score),
      usage_count: Number(item.usage_count ?? 0),
      yield_percentage: Number(item.yield_percentage),
    }
  }

  private performRecipeValidation(recipe: any, data: ValidateRecipeDto): RecipeValidation {
    const requiredMaterials = recipe.inputs as Record<string, number>
    const available = data.available_waste
    const materials_available = Object.entries(requiredMaterials).every(
      ([k, v]) => (available[k as keyof typeof available] ?? 0) >= Number(v),
    )

    const modules_available = recipe.required_modules.every((m: string) => data.available_modules.includes(m))

    const energy_required = Number(recipe.energy_required_kwh)
    const time_required = Number(recipe.processing_time_minutes)

    const energy_sufficient = data.energy_budget_kwh ? data.energy_budget_kwh >= energy_required : true
    const time_sufficient = data.time_budget_minutes ? data.time_budget_minutes >= time_required : true

    const is_feasible = materials_available && modules_available && energy_sufficient && time_sufficient

    const missing_requirements: RecipeValidation['missing_requirements'] = {}
    if (!materials_available) {
      const materials: Record<string, number> = {}
      for (const [k, v] of Object.entries(requiredMaterials)) {
        const have = available[k as keyof typeof available] ?? 0
        if (have < Number(v)) materials[k] = Number(v) - have
      }
      missing_requirements.materials = materials
    }
    if (!modules_available) {
      const needed = recipe.required_modules.filter((m: string) => !data.available_modules.includes(m))
      missing_requirements.modules = needed
    }
    if (!energy_sufficient) {
      missing_requirements.additional_energy_kwh = energy_required - (data.energy_budget_kwh ?? 0)
    }
    if (!time_sufficient) {
      missing_requirements.additional_time_minutes = time_required - (data.time_budget_minutes ?? 0)
    }

    const estimated_outputs: Record<string, number> = {}
    for (const [k, v] of Object.entries(recipe.outputs as Record<string, number>)) {
      estimated_outputs[k] = Number(v) * Number(recipe.yield_percentage)
    }

    return {
      estimated_outputs,
      is_feasible,
      missing_requirements,
      resource_utilization: {
        energy_percent: data.energy_budget_kwh ? energy_required / data.energy_budget_kwh : 0,
        time_percent: data.time_budget_minutes ? time_required / data.time_budget_minutes : 0,
      },
      validation_results: { energy_sufficient, materials_available, modules_available, time_sufficient },
    }
  }

  private calculateRecipeSuitability(recipe: any, data: RecommendationFiltersDto): RecipeRecommendation {
    const outputs = recipe.outputs as Record<string, number>
    const desired = new Set(data.desired_products ?? [])

    // Match score by overlap with desired outputs
    const desiredMatch = desired.size
      ? Object.keys(outputs).filter((p) => desired.has(p as any)).length / desired.size
      : 0.5

    // Waste utilization: sum of min(available, required) / sum(required)
    const inputs = recipe.inputs as Record<string, number>
    const requiredSum = Object.values(inputs).reduce((a: number, b: number) => a + Number(b), 0)
    const availableMatch = Object.entries(inputs).reduce((sum: number, [k, v]) => {
      const have = data.available_waste[k as keyof typeof data.available_waste] ?? 0
      return sum + Math.min(have, Number(v))
    }, 0)
    const wasteUtilization = requiredSum ? availableMatch / requiredSum : 0

    let suitability_score = 0.5 * desiredMatch + 0.5 * wasteUtilization
    if (data.optimization_goal === 'maximize_yield') suitability_score *= Number(recipe.yield_percentage)
    if (data.optimization_goal === 'minimize_energy') suitability_score *= 1 / (1 + Number(recipe.energy_required_kwh))
    if (data.optimization_goal === 'minimize_time')
      suitability_score *= 1 / (1 + Number(recipe.processing_time_minutes))

    const estimated_outputs: Record<string, number> = {}
    for (const [k, v] of Object.entries(outputs)) {
      estimated_outputs[k] = Number(v) * Number(recipe.yield_percentage)
    }

    return {
      estimated_outputs,
      reasoning: 'Based on desired products, waste availability, and optimization goal',
      recipe_id: recipe.id,
      recipe_name: recipe.name,
      resource_requirements: {
        energy_kwh: Number(recipe.energy_required_kwh),
        modules: recipe.required_modules as string[],
        time_minutes: Number(recipe.processing_time_minutes),
      },
      suitability_score,
      waste_utilization: inputs,
    }
  }
}
