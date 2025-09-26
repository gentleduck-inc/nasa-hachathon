import { createZodDto } from 'nestjs-zod'
import { ProcessingModulesMessages } from './processing_modules.constants'
import {
  createModuleSchema,
  maintenanceSchema,
  moduleFiltersSchema,
  updateModuleSchema,
} from './processing_modules.dto'

export type ProcessingModulesMessagesType = (typeof ProcessingModulesMessages)[number]

export class ModuleFiltersDto extends createZodDto(moduleFiltersSchema) {}
export class CreateModuleDto extends createZodDto(createModuleSchema) {}
export class UpdateModuleDto extends createZodDto(updateModuleSchema) {}
export class MaintenanceDto extends createZodDto(maintenanceSchema) {}
