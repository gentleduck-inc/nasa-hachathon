import { Module } from '@nestjs/common'
import { RecipesController } from './recipes.controller'
import { RecipesService } from './recipes.service'

@Module({
  controllers: [RecipesController],
  exports: [RecipesService],
  providers: [RecipesService],
})
export class ProcessingRecipesModule {}
