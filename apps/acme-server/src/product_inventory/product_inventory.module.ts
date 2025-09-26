import { Module } from '@nestjs/common'
import { ProductInventoryController } from './product_inventory.controller'
import { ProductInventoryService } from './product_inventory.service'

@Module({
  controllers: [ProductInventoryController],
  exports: [ProductInventoryService],
  providers: [ProductInventoryService],
})
export class ProductInventoryModule {}
