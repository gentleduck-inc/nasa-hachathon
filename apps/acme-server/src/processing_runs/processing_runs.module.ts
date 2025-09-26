import { Module } from '@nestjs/common'
import { QueueModule } from '~/queue/queue.module'
import { ProcessingRunsController } from './processing_runs.controller'
import { ProcessingRunsRepository } from './processing_runs.repository'
import { ProcessingRunsService } from './processing_runs.service'

@Module({
  controllers: [ProcessingRunsController],
  exports: [ProcessingRunsService, ProcessingRunsRepository],
  imports: [QueueModule],
  providers: [ProcessingRunsService, ProcessingRunsRepository],
})
export class ProcessingRunsModule {}
