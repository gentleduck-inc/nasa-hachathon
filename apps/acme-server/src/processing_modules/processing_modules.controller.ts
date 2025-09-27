import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common'
import { AuthGuard } from '~/auth/auth.guard'
import { ProcessingModulesService } from './processing_modules.service'
import { CreateModuleDto, MaintenanceDto, ModuleFiltersDto, UpdateModuleDto } from './processing_modules.types'

@UseGuards(AuthGuard)
@Controller('/modules')
export class ProcessingModulesController {
  constructor(private readonly service: ProcessingModulesService) {}

  @Get()
  async list(@Query() query: ModuleFiltersDto) {
    return this.service.listModules(query as any)
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.service.getModuleById(id)
  }

  @Post()
  async create(@Body() body: CreateModuleDto) {
    return this.service.createModule(body as any)
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() body: UpdateModuleDto) {
    return this.service.updateModule(id, body as any)
  }

  @Post(':id/reserve')
  async reserve(@Param('id') id: string) {
    return this.service.reserveModule(id)
  }

  @Post(':id/release')
  async release(@Param('id') id: string) {
    return this.service.releaseModule(id)
  }

  @Post(':id/maintenance')
  async maintenance(@Param('id') id: string, @Body() body: MaintenanceDto) {
    return this.service.setMaintenance(id, body as any)
  }
}
