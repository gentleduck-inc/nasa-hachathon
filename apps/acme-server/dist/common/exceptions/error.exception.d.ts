import { type ArgumentsHost, type ExceptionFilter, type WsExceptionFilter } from '@nestjs/common';
import { type WinstonLogger } from 'nest-winston';
export declare class ErrorExceptionFilter implements ExceptionFilter {
    private readonly logger;
    constructor(logger: WinstonLogger);
    catch(exception: Error, host: ArgumentsHost): void;
}
export declare class WSErrorExceptionFilter implements WsExceptionFilter {
    private readonly logger;
    constructor(logger: WinstonLogger);
    catch(exception: Error, host: ArgumentsHost): void;
}
