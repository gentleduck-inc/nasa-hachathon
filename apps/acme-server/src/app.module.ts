import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AuthModule } from './auth'
import { DrizzleModule } from './drizzle'
import { EmailModule } from './email'
import { LoggerModule } from './logger'
import { MinioModule } from './minio'
import { RedisModule } from './redis'

@Module({
  controllers: [],
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    LoggerModule,
    DrizzleModule,
    EmailModule,
    MinioModule,
    AuthModule,
    RedisModule,
  ],
  providers: [],
})
export class AppModule {}
