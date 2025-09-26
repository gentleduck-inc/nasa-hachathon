import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AuthModule } from './auth'
import { DrizzleModule } from './drizzle'
import { EmailModule } from './email'
import { LoggerModule } from './logger'
import { MinioModule } from './minio'
import { MissionsModule } from './missions/missions.module'
import { ProcessingModulesModule } from './processing_modules/processing_modules.module'
import { ProcessingRecipesModule } from './processing_recipes/processing_recipes.module'
import { ProcessingRunsModule } from './processing_runs/processing_runs.module'
import { ProductInventoryModule } from './product_inventory/product_inventory.module'
import { QueueModule } from './queue/queue.module'
import { SocketModule } from './socket/socket.module'
import { RedisModule } from './redis'
import { ResourceMonitoringModule } from './resource_monitoring/resource_monitoring.module'
import { WasteInventoryModule } from './waste_inventory/waste_inventory.module'
import { WasteMaterialsModule } from './waste_materials'

@Module({
  controllers: [],
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    LoggerModule,
    DrizzleModule,
    RedisModule,
    MinioModule,
    QueueModule,
    SocketModule,
    EmailModule,
    AuthModule,
    WasteMaterialsModule,
    WasteInventoryModule,
    MissionsModule,
    ProcessingModulesModule,
    ProcessingRecipesModule,
    ProductInventoryModule,
    ResourceMonitoringModule,
    ProcessingRunsModule,
  ],
  providers: [],
})
export class AppModule {}
