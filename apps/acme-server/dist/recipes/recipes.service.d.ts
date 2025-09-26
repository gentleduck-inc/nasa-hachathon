import type { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { schema } from '~/drizzle';
import { CreateRecipeDto, RecipeFiltersDto, RecipeItem, RecipeRecommendation, RecipeValidation, RecommendationFiltersDto, UpdateRecipeDto, ValidateRecipeDto } from './recipes.types';
export declare class RecipesService {
    private db;
    constructor(db: NodePgDatabase<typeof schema>);
    createRecipe(data: CreateRecipeDto, createdBy?: string): Promise<RecipeItem | undefined>;
    getRecipes(filters: RecipeFiltersDto): Promise<{
        items: RecipeItem[];
        pagination: {
            has_next: boolean;
            has_previous: boolean;
            limit: number;
            page: number;
            total: number;
            total_pages: number;
        };
    } | undefined>;
    validateRecipe(id: string, data: ValidateRecipeDto): Promise<RecipeValidation | undefined>;
    getRecipeRecommendations(data: RecommendationFiltersDto): Promise<RecipeRecommendation[] | undefined>;
    deactivateRecipe(id: string): Promise<RecipeItem | undefined>;
    updateRecipe(id: string, data: UpdateRecipeDto): Promise<RecipeItem | undefined>;
    private buildRecipeFiltersCondition;
    private formatRecipeItem;
    private performRecipeValidation;
    private calculateRecipeSuitability;
}
