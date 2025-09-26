var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { execSync } from 'node:child_process';
import { Injectable } from '@nestjs/common';
var LoggerService = (function () {
    function LoggerService() {
    }
    LoggerService.prototype.getRequestMetadata = function (req) {
        var ip = this.getIp(req);
        return {
            headers: req.headers,
            ip: ip,
            referer: req.headers['referer'] || '',
            userAgent: req.headers['user-agent'] || '',
        };
    };
    LoggerService.prototype.getIp = function (req) {
        var _a;
        var xForwardedFor = req.headers['x-forwarded-for'];
        var ip = (typeof xForwardedFor === 'string' ? xForwardedFor.split(',')[0].trim() : null) ||
            req.ip ||
            ((_a = req.connection) === null || _a === void 0 ? void 0 : _a.remoteAddress) ||
            '';
        if (this.isPrivateIp(ip)) {
            return this.getPublicIpSync() || ip;
        }
        return ip;
    };
    LoggerService.prototype.isPrivateIp = function (ip) {
        return (ip.startsWith('127.') ||
            ip.startsWith('10.') ||
            ip.startsWith('192.168.') ||
            ip.startsWith('172.') ||
            ip === '::1');
    };
    LoggerService.prototype.getPublicIpSync = function () {
        try {
            return execSync('curl -s https://api.ipify.org', { timeout: 1000 }).toString().trim();
        }
        catch (_a) {
            return null;
        }
    };
    LoggerService = __decorate([
        Injectable()
    ], LoggerService);
    return LoggerService;
}());
export { LoggerService };
//# sourceMappingURL=logger.service.js.map