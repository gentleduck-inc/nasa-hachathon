import { Body, Controller, Get, Headers, Param, Post, Query, UseGuards } from '@nestjs/common'
import { AuthGuard } from '~/auth/auth.guard'
import { ProcessingRunsService } from './processing_runs.service'
import { CreateRunDto, RunFiltersDto } from './processing_runs.types'

@UseGuards(AuthGuard)
@Controller('api/runs')
export class ProcessingRunsController {
  constructor(private readonly service: ProcessingRunsService) {}

  @Post()
  async create(@Body() body: CreateRunDto, @Headers('Idempotency-Key') idempotencyKey?: string) {
    return this.service.createRun({
      estimated_outputs: (body as any).estimated_outputs,
      idempotencyKey: idempotencyKey || '',
      input_quantities: (body as any).input_quantities,
      module_id: (body as any).module_id,
      name: (body as any).name,
      recipe_id: (body as any).recipe_id,
    })
  }

  @Get()
  async list(@Query() query: RunFiltersDto) {
    return this.service.listRuns(query as any)
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.service.getRunById(id)
  }

  @Post(':id/cancel')
  async cancel(@Param('id') id: string) {
    return this.service.cancelRun(id)
  }

  @Post(':id/retry')
  async retry(@Param('id') id: string) {
    return this.service.retryRun(id)
  }

  @Get(':id/logs')
  async logs(@Param('id') id: string) {
    return this.service.getLogs(id)
  }
}
