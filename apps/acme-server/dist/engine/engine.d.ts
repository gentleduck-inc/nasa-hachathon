import type { Mission, ModuleStatus, ProcessingModule, ProcessingRecipe, ProductType, SimulationConfig, SimulationResults, WasteMaterial } from '@acme/db/types';
export interface SimulationState {
    timestep: number;
    day: number;
    inventory: Record<string, number>;
    products: Record<string, {
        units: number;
        totalMassKg: number;
    }>;
    metrics: {
        energyKwh: number;
        crewHours: number;
        waterLiters: number;
        recoveredKg: number;
        wasteProcessedKg: number;
    };
    moduleStates: Record<string, {
        status: ModuleStatus;
        currentLoad: number;
        maintenanceHours: number;
    }>;
}
export interface SimulationStep {
    stepIndex: number;
    timestamp: Date;
    snapshot: SimulationState;
    events: Array<{
        type: 'waste_collection' | 'processing' | 'product_creation' | 'maintenance';
        description: string;
        materialsInvolved: string[];
        energyUsedKwh?: number;
        crewTimeMinutes?: number;
    }>;
}
export interface ProcessExecution {
    recipeId: string;
    moduleId: string;
    inputMaterials: Record<string, number>;
    outputProducts: Array<{
        productType: ProductType;
        units: number;
        massKg: number;
    }>;
    energyKwh: number;
    crewMinutes: number;
    processingTimeMinutes: number;
}
export interface OptimizerConfig {
    mode: 'greedy' | 'genetic' | 'milp';
    constraints?: {
        maxDailyEnergyKwh?: number;
        maxCrewHoursPerDay?: number;
        maxWaterLitersPerDay?: number;
    };
    objectives: {
        maximizeRecovery: number;
        minimizeEnergy: number;
        minimizeCrew: number;
        maximizeUtility: number;
    };
    geneticParams?: {
        population: number;
        generations: number;
        mutationRate: number;
        crossoverRate: number;
        seed?: number;
    };
}
export declare class MarsWasteSimulator {
    private mission;
    private materials;
    private modules;
    private recipes;
    private random;
    constructor(mission: Mission, materials: WasteMaterial[], modules: ProcessingModule[], recipes: ProcessingRecipe[], seed?: number);
    simulate(config: SimulationConfig): SimulationResults;
    private initializeState;
    private generateDailyWaste;
    private optimizeDaily;
    private calculateRecipeScore;
    private canExecuteRecipe;
    private planRecipeExecution;
    private executeDailyPlan;
    private updateModuleMaintenance;
    private generateResults;
    private generateRecommendations;
}
export declare function generateSankeyData(result: SimulationResults, materials: WasteMaterial[], recipes: ProcessingRecipe[]): {
    nodes: Array<{
        id: string;
        name: string;
        category: string;
    }>;
    links: Array<{
        source: string;
        target: string;
        value: number;
    }>;
};
export default MarsWasteSimulator;
