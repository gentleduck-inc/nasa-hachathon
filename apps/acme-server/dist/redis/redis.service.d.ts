import { ConfigService } from '@nestjs/config';
import { type RedisClientType } from 'redis';
export declare class RedisService {
    private readonly config;
    constructor(config: ConfigService);
    connectToRedis(): Promise<RedisClientType>;
}
