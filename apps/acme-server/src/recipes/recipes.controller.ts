import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common'
import { AuthGuard } from '~/auth/auth.guard'
import { RecipesService } from './recipes.service'
import {
  CreateRecipeDto,
  RecipeFiltersDto,
  RecommendationFiltersDto,
  UpdateRecipeDto,
  ValidateRecipeDto,
} from './recipes.types'

@UseGuards(AuthGuard)
@Controller('api/recipes')
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}

  @Get()
  async list(@Query() filters: RecipeFiltersDto) {
    return this.recipesService.getRecipes(filters)
  }

  @Post()
  async create(@Body() body: CreateRecipeDto) {
    return this.recipesService.createRecipe(body)
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() body: UpdateRecipeDto) {
    return this.recipesService.updateRecipe(id, body)
  }

  @Delete(':id')
  async deactivate(@Param('id') id: string) {
    return this.recipesService.deactivateRecipe(id)
  }

  @Post(':id/validate')
  async validate(@Param('id') id: string, @Body() body: ValidateRecipeDto) {
    return this.recipesService.validateRecipe(id, body)
  }

  @Get('recommendations')
  async recommendations(@Query() filters: RecommendationFiltersDto) {
    return this.recipesService.getRecipeRecommendations(filters)
  }
}
