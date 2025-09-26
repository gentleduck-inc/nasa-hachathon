var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Catch, Inject, Injectable, } from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
var ErrorExceptionFilter = (function () {
    function ErrorExceptionFilter(logger) {
        this.logger = logger;
    }
    ErrorExceptionFilter.prototype.catch = function (exception, host) {
        var _a;
        var ctx = host.switchToHttp();
        var response = ctx.getResponse();
        var request = ctx.getRequest();
        var logPayload = {
            headers: request.headers,
            ip: request.headers['x-forwarded-for'] ||
                ((_a = request.connection) === null || _a === void 0 ? void 0 : _a.remoteAddress) ||
                request.socket.remoteAddress,
            message: exception.message,
            method: request.method,
            stack: exception.stack,
            type: 'HTTP_EXCEPTION',
            url: request.url,
        };
        response.status(exception.cause).json({
            message: exception.message,
            state: 'error',
        });
    };
    ErrorExceptionFilter = __decorate([
        Injectable(),
        Catch(),
        __param(0, Inject(WINSTON_MODULE_NEST_PROVIDER)),
        __metadata("design:paramtypes", [Function])
    ], ErrorExceptionFilter);
    return ErrorExceptionFilter;
}());
export { ErrorExceptionFilter };
var WSErrorExceptionFilter = (function () {
    function WSErrorExceptionFilter(logger) {
        this.logger = logger;
    }
    WSErrorExceptionFilter.prototype.catch = function (exception, host) {
        var _a, _b;
        var client = host.switchToWs().getClient();
        var data = host.switchToWs().getData();
        var ip = (_a = client.handshake) === null || _a === void 0 ? void 0 : _a.address;
        var logPayload = {
            data: data,
            event: (data === null || data === void 0 ? void 0 : data.event) || 'unknown',
            headers: (_b = client.handshake) === null || _b === void 0 ? void 0 : _b.headers,
            ip: ip,
            message: exception.message,
            stack: exception.stack,
            type: 'WS_EXCEPTION',
        };
        this.logger.error(logPayload);
        client.emit('error', {
            message: exception.message,
            status: 'error',
        });
    };
    WSErrorExceptionFilter = __decorate([
        Injectable(),
        Catch(),
        __param(0, Inject(WINSTON_MODULE_NEST_PROVIDER)),
        __metadata("design:paramtypes", [Function])
    ], WSErrorExceptionFilter);
    return WSErrorExceptionFilter;
}());
export { WSErrorExceptionFilter };
//# sourceMappingURL=error.exception.js.map