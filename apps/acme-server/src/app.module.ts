import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AuthModule } from './auth'
import { HealthModule } from './common/health'
import { DrizzleModule } from './drizzle'
import { EmailModule } from './email'
import { LoggerModule } from './logger'
import { MinioModule } from './minio'
import { ProcessingModulesModule } from './processing_modules/processing_modules.module'
import { ProcessingRunsModule } from './processing_runs/processing_runs.module'
import { ProductInventoryModule } from './product_inventory/product_inventory.module'
import { QueueModule } from './queue/queue.module'
import { RedisModule } from './redis'
import { SocketModule } from './socket/socket.module'
import { WasteInventorysModule } from './waste_inventory'

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
    // HealthModule,
    WasteInventorysModule,
    ProcessingModulesModule,
    ProductInventoryModule,
    ProcessingRunsModule,
  ],
  providers: [],
})
export class AppModule {}
