import { ConfigService } from '@nestjs/config'

export function bullmqConnection(config: ConfigService) {
  return {
    connection: {
      host: config.get<string>('REDIS_HOST') || '127.0.0.1',
      port: Number(config.get<string>('REDIS_PORT') || 6379),
      password: config.get<string>('REDIS_PASSWORD') || undefined,
      db: Number(config.get<string>('REDIS_DB') || 0),
    },
  }
}
