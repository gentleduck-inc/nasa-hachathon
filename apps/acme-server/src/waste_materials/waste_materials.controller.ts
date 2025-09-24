import { Body, Controller, Delete, Get, Param, Patch, Post, UseFilters } from '@nestjs/common'
import { ZodValidationPipe } from '~/common/pipes'
import { ErrorExceptionFilter } from '~/common/exceptions'
import { WasteMaterialsService } from './waste_materials.service'
import {
  createWasteMaterialSchema,
  updateWasteMaterialSchema,
  type CreateWasteMaterialDto,
  type UpdateWasteMaterialDto,
} from './waste_materials.dto'
import type { ResponseType } from '~/common/types'

@Controller('waste_materials')
@UseFilters(ErrorExceptionFilter)
export class WasteMaterialsController {
  constructor(private readonly wasteMaterialsService: WasteMaterialsService) {}

  @Post('/')
  async createWasteMaterial(
    @Body(new ZodValidationPipe(createWasteMaterialSchema)) body: CreateWasteMaterialDto,
  ): Promise<ResponseType<Awaited<ReturnType<typeof this.wasteMaterialsService.createWasteMaterial>>, any>> {
    const data = await this.wasteMaterialsService.createWasteMaterial(body)
    return { data, message: 'WASTE_CREATE_SUCCESS', state: 'success' }
  }

  @Get('/')
  async getWasteMaterials() {
    const data = await this.wasteMaterialsService.getWasteMaterials()
    return { data, message: 'WASTE_GET_SUCCESS', state: 'success' }
  }

  @Get(':id')
  async getWasteMaterialById(@Param('id') id: string) {
    const data = await this.wasteMaterialsService.getWasteMaterialById(id)
    return { data, message: 'WASTE_GET_BY_ID_SUCCESS', state: 'success' }
  }

  @Patch('/')
  async updateWasteMaterial(@Body(new ZodValidationPipe(updateWasteMaterialSchema)) body: UpdateWasteMaterialDto) {
    const data = await this.wasteMaterialsService.updateWasteMaterial(body)
    return { data, message: 'WASTE_UPDATE_SUCCESS', state: 'success' }
  }

  @Delete(':id')
  async deleteWasteMaterial(@Param('id') id: string) {
    const data = await this.wasteMaterialsService.deleteWasteMaterial(id)
    return { data, message: 'WASTE_DELETE_SUCCESS', state: 'success' }
  }
}
