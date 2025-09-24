import { Module } from '@nestjs/common'
import { WasteMaterialsController } from './waste_materials.controller'
import { WasteMaterialsService } from './waste_materials.service'

@Module({
  controllers: [WasteMaterialsController],
  providers: [WasteMaterialsService],
})
export class WasteMaterialsModule {}
