import { Body, Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common'
import { AuthGuard } from '~/auth/auth.guard'
import { ProductInventoryService } from './product_inventory.service'

@UseGuards(AuthGuard)
@Controller('api/products')
export class ProductInventoryController {
  constructor(private readonly service: ProductInventoryService) {}

  @Get()
  async list() {
    return this.service.list()
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.service.getById(id)
  }

  @Post()
  async create(@Body() body: any) {
    return this.service.create(body)
  }

  @Put(':id/reserve')
  async reserve(@Param('id') id: string, @Body() body: { quantity: number }) {
    return this.service.reserve(id, body.quantity)
  }

  @Put(':id/consume')
  async consume(@Param('id') id: string, @Body() body: { quantity: number }) {
    return this.service.consume(id, body.quantity)
  }
}
