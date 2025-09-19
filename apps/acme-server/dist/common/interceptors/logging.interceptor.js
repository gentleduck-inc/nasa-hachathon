"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "LoggingInterceptor", {
    enumerable: true,
    get: function() {
        return LoggingInterceptor;
    }
});
const _common = require("@nestjs/common");
const _rxjs = require("rxjs");
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
let LoggingInterceptor = class LoggingInterceptor {
    intercept(context, next) {
        const req = context.switchToHttp().getRequest();
        const { method, url } = req;
        const now = Date.now();
        return next.handle().pipe((0, _rxjs.tap)(()=>{
            const delay = Date.now() - now;
            this.logger.log(`${method} ${url} - ${delay}ms`, 'HTTP');
        }));
    }
    constructor(logger){
        this.logger = logger;
    }
};
LoggingInterceptor = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(0, (0, _common.Inject)(_nestwinston.WINSTON_MODULE_NEST_PROVIDER)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _nestwinston.WinstonLogger === "undefined" ? Object : _nestwinston.WinstonLogger
    ])
], LoggingInterceptor);

//# sourceMappingURL=logging.interceptor.js.map