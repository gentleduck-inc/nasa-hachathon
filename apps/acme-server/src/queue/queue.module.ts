import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { QueueService } from './queue.service'

@Module({
  exports: [QueueService],
  imports: [ConfigModule],
  providers: [QueueService],
})
export class QueueModule {}
