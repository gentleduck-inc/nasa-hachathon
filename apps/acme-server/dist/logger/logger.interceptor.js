"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "LoggerInterceptor", {
    enumerable: true,
    get: function() {
        return LoggerInterceptor;
    }
});
const _common = require("@nestjs/common");
const _nestwinston = require("nest-winston");
const _rxjs = require("rxjs");
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
let LoggerInterceptor = class LoggerInterceptor {
    intercept(context, next) {
        const req = context.switchToHttp().getRequest();
        const { method, url } = req;
        const now = Date.now();
        const metadata = this.meta.getRequestMetadata(req);
        return next.handle().pipe((0, _rxjs.tap)(()=>{
            const delay = Date.now() - now;
            this.logger.log({
                context: 'HTTP',
                delay,
                message: `${method} ${url} - ${delay}ms`,
                method,
                url,
                ...metadata
            });
        }));
    }
    constructor(logger, meta){
        this.logger = logger;
        this.meta = meta;
    }
};
LoggerInterceptor = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(0, (0, _common.Inject)(_nestwinston.WINSTON_MODULE_NEST_PROVIDER)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof WinstonLogger === "undefined" ? Object : WinstonLogger,
        typeof LoggerService === "undefined" ? Object : LoggerService
    ])
], LoggerInterceptor);

//# sourceMappingURL=logger.interceptor.js.map