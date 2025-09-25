"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: Object.getOwnPropertyDescriptor(all, name).get
    });
}
_export(exports, {
    get ErrorExceptionFilter () {
        return ErrorExceptionFilter;
    },
    get WSErrorExceptionFilter () {
        return WSErrorExceptionFilter;
    }
});
const _common = require("@nestjs/common");
const _nestwinston = require("nest-winston");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
function _ts_param(paramIndex, decorator) {
    return function(target, key) {
        decorator(target, key, paramIndex);
    };
}
let ErrorExceptionFilter = class ErrorExceptionFilter {
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        const status = 500;
        const logPayload = {
            headers: request.headers,
            ip: request.headers['x-forwarded-for'] || request.connection?.remoteAddress || request.socket.remoteAddress,
            message: exception.message,
            method: request.method,
            stack: exception.stack,
            type: 'HTTP_EXCEPTION',
            url: request.url
        };
        this.logger.error(logPayload);
        response.status(status).json({
            message: exception.message,
            state: 'error'
        });
    }
    constructor(logger){
        this.logger = logger;
    }
};
ErrorExceptionFilter = _ts_decorate([
    (0, _common.Injectable)(),
    (0, _common.Catch)(),
    _ts_param(0, (0, _common.Inject)(_nestwinston.WINSTON_MODULE_NEST_PROVIDER)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof WinstonLogger === "undefined" ? Object : WinstonLogger
    ])
], ErrorExceptionFilter);
let WSErrorExceptionFilter = class WSErrorExceptionFilter {
    catch(exception, host) {
        const client = host.switchToWs().getClient();
        const data = host.switchToWs().getData();
        const ip = client.handshake?.address;
        const logPayload = {
            data: data,
            event: data?.event || 'unknown',
            headers: client.handshake?.headers,
            ip,
            message: exception.message,
            stack: exception.stack,
            type: 'WS_EXCEPTION'
        };
        this.logger.error(logPayload);
        client.emit('error', {
            message: exception.message,
            status: 'error'
        });
    }
    constructor(logger){
        this.logger = logger;
    }
};
WSErrorExceptionFilter = _ts_decorate([
    (0, _common.Injectable)(),
    (0, _common.Catch)(),
    _ts_param(0, (0, _common.Inject)(_nestwinston.WINSTON_MODULE_NEST_PROVIDER)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof WinstonLogger === "undefined" ? Object : WinstonLogger
    ])
], WSErrorExceptionFilter);

//# sourceMappingURL=error.exception.js.map