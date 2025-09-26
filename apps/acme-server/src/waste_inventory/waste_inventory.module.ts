import { Module } from '@nestjs/common'
import { WasteInventorysController } from './waste_inventory.controller'
import { WasteInventorysService } from './waste_inventory.service'

@Module({
  controllers: [WasteInventorysController],
  providers: [WasteInventorysService],
})
export class WasteInventorysModule {}
