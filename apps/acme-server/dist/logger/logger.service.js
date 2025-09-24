"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "LoggerService", {
    enumerable: true,
    get: function() {
        return LoggerService;
    }
});
const _nodechild_process = require("node:child_process");
const _common = require("@nestjs/common");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let LoggerService = class LoggerService {
    getRequestMetadata(req) {
        const ip = this.getIp(req);
        return {
            headers: req.headers,
            ip,
            referer: req.headers['referer'] || '',
            userAgent: req.headers['user-agent'] || ''
        };
    }
    getIp(req) {
        const xForwardedFor = req.headers['x-forwarded-for'];
        const ip = (typeof xForwardedFor === 'string' ? xForwardedFor.split(',')[0].trim() : null) || req.ip || req.connection?.remoteAddress || '';
        if (this.isPrivateIp(ip)) {
            return this.getPublicIpSync() || ip;
        }
        return ip;
    }
    isPrivateIp(ip) {
        return ip.startsWith('127.') || ip.startsWith('10.') || ip.startsWith('192.168.') || ip.startsWith('172.') || ip === '::1';
    }
    getPublicIpSync() {
        try {
            return (0, _nodechild_process.execSync)('curl -s https://api.ipify.org', {
                timeout: 1000
            }).toString().trim();
        } catch  {
            return null;
        }
    }
};
LoggerService = _ts_decorate([
    (0, _common.Injectable)()
], LoggerService);

//# sourceMappingURL=logger.service.js.map