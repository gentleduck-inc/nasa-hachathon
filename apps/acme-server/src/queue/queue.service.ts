import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { DEFAULT_QUEUE_NAME, ProcessRunPayload, QueueOptions } from './queue.constants'

// Lazy/dynamic import to avoid hard type dependency at build time
let BullMQ: any

@Injectable()
export class QueueService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(QueueService.name)
  private queue!: any
  private worker!: any

  constructor(private readonly config: ConfigService) {}

  async onModuleInit() {
    // Dynamically import bullmq
    if (!BullMQ) {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      BullMQ = require('bullmq')
    }

    const connection = {
      connection: {
        host: this.config.get<string>('REDIS_HOST') || '127.0.0.1',
        port: Number(this.config.get<string>('REDIS_PORT') || 6379),
        password: this.config.get<string>('REDIS_PASSWORD') || undefined,
        db: Number(this.config.get<string>('REDIS_DB') || 0),
      },
    }

    this.queue = new BullMQ.Queue(DEFAULT_QUEUE_NAME, connection)

    const concurrency = Number(this.config.get<string>('QUEUE_CONCURRENCY') || 4)

    this.worker = new BullMQ.Worker(
      DEFAULT_QUEUE_NAME,
      async (job: any) => {
        if (job.name === 'processRun') {
          const payload: ProcessRunPayload = job.data
          // TODO: Integrate with ProcessingRunsService to advance run state, stream progress, etc.
          this.logger.log(`Processing run: ${payload.runId} (recipe=${payload.recipeId}, module=${payload.moduleId})`)
        }
      },
      { ...connection, concurrency },
    )

    this.worker.on('completed', (job: any) => this.logger.log(`Job ${job.id} completed`))
    this.worker.on('failed', (job: any, err: any) => this.logger.error(`Job ${job?.id} failed: ${err?.message}`))

    this.logger.log(`Queue initialized: ${DEFAULT_QUEUE_NAME}`)
  }

  async onModuleDestroy() {
    try {
      if (this.worker) await this.worker.close()
      if (this.queue) await this.queue.close()
    } catch (e) {
      // noop
    }
  }

  // Public API
  async addProcessRun(payload: ProcessRunPayload, opts?: QueueOptions) {
    const options: any = {
      removeOnComplete: true,
      removeOnFail: false,
      ...(opts || {}),
    }
    return this.queue.add('processRun', payload, options)
  }

  async remove(jobId: string) {
    const job = await this.queue.getJob(jobId)
    if (job) return job.remove()
  }
}
