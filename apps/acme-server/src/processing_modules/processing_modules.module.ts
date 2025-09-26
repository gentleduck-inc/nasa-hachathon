import { Module } from '@nestjs/common'
import { ProcessingModulesController } from './processing_modules.controller'
import { ProcessingModulesService } from './processing_modules.service'

@Module({
  controllers: [ProcessingModulesController],
  exports: [ProcessingModulesService],
  providers: [ProcessingModulesService],
})
export class ProcessingModulesModule {}
