import { Module } from '@nestjs/common'
import { QueueModule } from '~/queue/queue.module'
import { ProcessingRunsController } from './processing_runs.controller'
import { ProcessingRunsRepository } from './processing_runs.repository'
import { ProcessingRunsService } from './processing_runs.service'

@Module({
  imports: [QueueModule],
  controllers: [ProcessingRunsController],
  providers: [ProcessingRunsService, ProcessingRunsRepository],
  exports: [ProcessingRunsService, ProcessingRunsRepository],
})
export class ProcessingRunsModule {}
