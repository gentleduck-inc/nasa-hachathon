import { Module } from '@nestjs/common'
import { ProductInventoryController } from './product_inventory.controller'
import { ProductInventoryService } from './product_inventory.service'

@Module({
  controllers: [ProductInventoryController],
  providers: [ProductInventoryService],
  exports: [ProductInventoryService],
})
export class ProductInventoryModule {}
