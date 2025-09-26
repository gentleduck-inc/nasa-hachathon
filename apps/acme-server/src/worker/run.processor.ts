import { DEFAULT_QUEUE_NAME } from '../queue/queue.constants'
import type { RunHandler } from './run.handler'

// Lazy import to avoid build-time dependency issues
let BullMQ: any

export function buildRunWorker(connection: any, handler: RunHandler, concurrency: number) {
  if (!BullMQ) BullMQ = require('bullmq')

  const worker = new BullMQ.Worker(
    DEFAULT_QUEUE_NAME,
    async (job: any) => {
      const data = job.data as { runId: string }
      await handler.process({ runId: data.runId || job.id })
      return { ok: true }
    },
    { concurrency, ...connection },
  )

  worker.on('completed', (job: any) => console.log(`[worker] job ${job.id} completed`))
  worker.on('failed', (job: any, err: any) => console.error(`[worker] job ${job?.id} failed: ${err?.message}`))

  return worker
}
