import { RecipesService } from './recipes.service';
import { CreateRecipeDto, RecipeFiltersDto, RecommendationFiltersDto, UpdateRecipeDto, ValidateRecipeDto } from './recipes.types';
export declare class RecipesController {
    private readonly recipesService;
    constructor(recipesService: RecipesService);
    list(filters: RecipeFiltersDto): Promise<{
        items: import("./recipes.types").RecipeItem[];
        pagination: {
            has_next: boolean;
            has_previous: boolean;
            limit: number;
            page: number;
            total: number;
            total_pages: number;
        };
    } | undefined>;
    create(body: CreateRecipeDto): Promise<import("./recipes.types").RecipeItem | undefined>;
    update(id: string, body: UpdateRecipeDto): Promise<import("./recipes.types").RecipeItem | undefined>;
    deactivate(id: string): Promise<import("./recipes.types").RecipeItem | undefined>;
    validate(id: string, body: ValidateRecipeDto): Promise<import("./recipes.types").RecipeValidation | undefined>;
    recommendations(filters: RecommendationFiltersDto): Promise<import("./recipes.types").RecipeRecommendation[] | undefined>;
}
