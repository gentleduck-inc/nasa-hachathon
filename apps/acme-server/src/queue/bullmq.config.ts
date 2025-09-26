import { ConfigService } from '@nestjs/config'

export function bullmqConnection(config: ConfigService) {
  return {
    connection: {
      db: Number(config.get<string>('REDIS_DB') || 0),
      host: config.get<string>('REDIS_HOST') || '127.0.0.1',
      password: config.get<string>('REDIS_PASSWORD') || undefined,
      port: Number(config.get<string>('REDIS_PORT') || 6379),
    },
  }
}
