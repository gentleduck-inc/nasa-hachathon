var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
import { Inject, Injectable } from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { tap } from 'rxjs';
import { LoggerService } from './logger.service';
var LoggerInterceptor = (function () {
    function LoggerInterceptor(logger, meta) {
        this.logger = logger;
        this.meta = meta;
    }
    LoggerInterceptor.prototype.intercept = function (context, next) {
        var _this = this;
        var req = context.switchToHttp().getRequest();
        var method = req.method, url = req.url;
        var now = Date.now();
        var metadata = this.meta.getRequestMetadata(req);
        return next.handle().pipe(tap(function () {
            var delay = Date.now() - now;
            _this.logger.log(__assign({ context: 'HTTP', delay: delay, message: "".concat(method, " ").concat(url, " - ").concat(delay, "ms"), method: method, url: url }, metadata));
        }));
    };
    LoggerInterceptor = __decorate([
        Injectable(),
        __param(0, Inject(WINSTON_MODULE_NEST_PROVIDER)),
        __metadata("design:paramtypes", [Function, LoggerService])
    ], LoggerInterceptor);
    return LoggerInterceptor;
}());
export { LoggerInterceptor };
//# sourceMappingURL=logger.interceptor.js.map