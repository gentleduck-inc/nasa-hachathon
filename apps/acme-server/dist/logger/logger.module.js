var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Module } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import { LoggerInterceptor } from './logger.interceptor';
import { LoggerService } from './logger.service';
var LoggerModule = (function () {
    function LoggerModule() {
    }
    LoggerModule = __decorate([
        Module({
            exports: [LoggerService, LoggerInterceptor],
            imports: [
                WinstonModule.forRoot({
                    transports: [],
                }),
            ],
            providers: [LoggerService, LoggerInterceptor],
        })
    ], LoggerModule);
    return LoggerModule;
}());
export { LoggerModule };
//# sourceMappingURL=logger.module.js.map