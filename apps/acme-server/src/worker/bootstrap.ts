import 'dotenv/config'
import { ConfigService } from '@nestjs/config'
import { RunHandler } from './run.handler'
import { buildRunWorker } from './run.processor'

async function main() {
  const cfg = new ConfigService(process.env as any)

  const databaseUrl = cfg.get<string>('DATABASE_URL')
  if (!databaseUrl) throw new Error('DATABASE_URL is required')

  const handler = new RunHandler(databaseUrl)
  await handler.init()

  const connection = {
    connection: {
      db: Number(cfg.get<string>('REDIS_DB') || 0),
      host: cfg.get<string>('REDIS_HOST') || '127.0.0.1',
      password: cfg.get<string>('REDIS_PASSWORD') || undefined,
      port: Number(cfg.get<string>('REDIS_PORT') || 6379),
    },
  }
  const concurrency = Number(cfg.get<string>('QUEUE_CONCURRENCY') || 4)

  const worker = buildRunWorker(connection, handler, concurrency)

  const shutdown = async () => {
    try {
      // bullmq worker has close()
      await (worker as any).close()
    } catch (e) {}
    process.exit(0)
  }
  process.on('SIGINT', shutdown)
  process.on('SIGTERM', shutdown)

  // keep process alive
  // eslint-disable-next-line no-constant-condition
  while (true) {
    await new Promise((r) => setTimeout(r, 60_000))
  }
}

main().catch((e) => {
  console.error('Worker failed to start', e)
  process.exit(1)
})
