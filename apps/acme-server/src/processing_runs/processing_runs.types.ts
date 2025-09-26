import { createZodDto } from 'nestjs-zod'
import { ProcessingRunsMessages } from './processing_runs.constants'
import { createRunSchema, runFiltersSchema } from './processing_runs.dto'

export type ProcessingRunsMessagesType = (typeof ProcessingRunsMessages)[number]

export class CreateRunDto extends createZodDto(createRunSchema) {}
export class RunFiltersDto extends createZodDto(runFiltersSchema) {}
