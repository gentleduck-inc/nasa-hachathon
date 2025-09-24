"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "LoggerModule", {
    enumerable: true,
    get: function() {
        return LoggerModule;
    }
});
const _common = require("@nestjs/common");
const _nestwinston = require("nest-winston");
const _winston = /*#__PURE__*/ _interop_require_default(require("winston"));
const _loggerinterceptor = require("./logger.interceptor");
const _loggerservice = require("./logger.service");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let LoggerModule = class LoggerModule {
};
LoggerModule = _ts_decorate([
    (0, _common.Module)({
        // exports: [LoggerService, LoggerInterceptor],
        imports: [
            _nestwinston.WinstonModule.forRoot({
                level: 'info',
                format: _winston.default.format.combine(_winston.default.format.timestamp(), _winston.default.format.json()),
                transports: [
                    new _winston.default.transports.Console()
                ]
            })
        ],
        providers: [
            _loggerservice.LoggerService,
            _loggerinterceptor.LoggerInterceptor
        ]
    })
], LoggerModule);

//# sourceMappingURL=logger.module.js.map