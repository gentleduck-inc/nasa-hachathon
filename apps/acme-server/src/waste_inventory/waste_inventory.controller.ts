import { Body, Controller, Delete, Get, Param, Patch, Post, UseFilters } from '@nestjs/common'
import { ErrorExceptionFilter } from '~/common/exceptions'
import { ZodValidationPipe } from '~/common/pipes'
import type { ResponseType } from '~/common/types'
import { createWasteInventorySchema, updateWasteInventorySchema } from './waste_inventory.dto'
import { WasteInventorysService } from './waste_inventory.service'
import { CreateWasteInventoryDto, UpdateWasteInventoryDto } from './waste_inventory.types'

@Controller('waste_inventory')
@UseFilters(ErrorExceptionFilter)
export class WasteInventorysController {
  constructor(private readonly wasteInventorysService: WasteInventorysService) {}

  @Post('/')
  async createWasteInventory(
    @Body(new ZodValidationPipe(createWasteInventorySchema)) body: CreateWasteInventoryDto,
  ): Promise<ResponseType<Awaited<ReturnType<typeof this.wasteInventorysService.createWasteInventory>>, any>> {
    const data = await this.wasteInventorysService.createWasteInventory(body)
    return { data, message: 'WASTE_CREATE_SUCCESS', state: 'success' }
  }

  @Get('/')
  async getWasteInventorys() {
    const data = await this.wasteInventorysService.getWasteInventorys()
    return { data, message: 'WASTE_GET_SUCCESS', state: 'success' }
  }

  @Get(':id')
  async getWasteInventoryById(@Param('id') id: string) {
    const data = await this.wasteInventorysService.getWasteInventoryById(id)
    return { data, message: 'WASTE_GET_BY_ID_SUCCESS', state: 'success' }
  }

  @Patch(':id')
  async updateWasteInventory(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(updateWasteInventorySchema)) body: UpdateWasteInventoryDto,
  ) {
    const data = await this.wasteInventorysService.updateWasteInventory({ ...body, id })
    return { data, message: 'WASTE_UPDATE_SUCCESS', state: 'success' }
  }

  @Delete(':id')
  async deleteWasteInventory(@Param('id') id: string) {
    const data = await this.wasteInventorysService.deleteWasteInventory(id)
    return { data, message: 'WASTE_DELETE_SUCCESS', state: 'success' }
  }
}
