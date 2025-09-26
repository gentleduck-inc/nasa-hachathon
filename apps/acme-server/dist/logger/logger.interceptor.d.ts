import { type CallHandler, type ExecutionContext, type NestInterceptor } from '@nestjs/common';
import { type WinstonLogger } from 'nest-winston';
import { type Observable } from 'rxjs';
import { LoggerService } from './logger.service';
export declare class LoggerInterceptor implements NestInterceptor {
    private readonly logger;
    private readonly meta;
    constructor(logger: WinstonLogger, meta: LoggerService);
    intercept(context: ExecutionContext, next: CallHandler): Observable<any>;
}
