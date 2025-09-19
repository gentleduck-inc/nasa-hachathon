"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "EmailService", {
    enumerable: true,
    get: function() {
        return EmailService;
    }
});
const _otpgenerator = /*#__PURE__*/ _interop_require_default(require("otp-generator"));
const _common = require("@nestjs/common");
const _nodemailer = /*#__PURE__*/ _interop_require_wildcard(require("nodemailer"));
const _drizzle = require("../drizzle");
const _nodepostgres = require("drizzle-orm/node-postgres");
const _emails = require("./emails");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function _getRequireWildcardCache(nodeInterop) {
    if (typeof WeakMap !== "function") return null;
    var cacheBabelInterop = new WeakMap();
    var cacheNodeInterop = new WeakMap();
    return (_getRequireWildcardCache = function(nodeInterop) {
        return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
    })(nodeInterop);
}
function _interop_require_wildcard(obj, nodeInterop) {
    if (!nodeInterop && obj && obj.__esModule) {
        return obj;
    }
    if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
        return {
            default: obj
        };
    }
    var cache = _getRequireWildcardCache(nodeInterop);
    if (cache && cache.has(obj)) {
        return cache.get(obj);
    }
    var newObj = {
        __proto__: null
    };
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for(var key in obj){
        if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
            var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
            if (desc && (desc.get || desc.set)) {
                Object.defineProperty(newObj, key, desc);
            } else {
                newObj[key] = obj[key];
            }
        }
    }
    newObj.default = obj;
    if (cache) {
        cache.set(obj, newObj);
    }
    return newObj;
}
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
let EmailService = class EmailService {
    async generateOTP({ user_id }) {
        try {
            const OTP = _otpgenerator.default.generate(6, {
                upperCaseAlphabets: false,
                specialChars: false,
                lowerCaseAlphabets: false
            });
            const expires_at = new Date(Date.now() + 60000 * 10) // Expires after 10 minutes
            ;
        // const otp = await this.db.
        // const tp = await prisma.otp.create({
        //   data: {
        //     user_id,
        //     otp: OTP,
        //     expires_at,
        //   },
        // })
        //
        // if (!tp) return { otp: null }
        //
        // return { otp: OTP }
        } catch (error) {
            return {
                otp: null
            };
        }
    }
    async sendTestEmail(to) {
        // const html = await render(require('./views/welcome.view').default, { code: 'hello world' })
        const html = await (0, _emails.renderEmailTemplate)('welcome', {
            name: 'Ahmed'
        });
        console.log(html);
    //
    // console.log(emailHtml)
    // console.log(require('./views/welcome.view'))
    //   await this.transporter.sendMail({
    //     from: '"App Bot" <no-reply@example.com>',
    //     to,
    //     subject: 'Hello from NestJS',
    //     text: 'This is a test email sent via MailHog SMTP!',
    //     html: html,
    //   })
    // }
    // async sendTestEmail(to: string) {
    //   await this.mailerService.sendMail({
    //     to: 'john@domain.com',
    //     subject: 'Testing react template',
    //     template: 'welcome',
    //     context: {
    //       code: '123456',
    //       name: 'John Doe',
    //     },
    //   })
    //
    //   return 'Mail sent!'
    }
    constructor(db){
        this.db = db;
        this.transporter = _nodemailer.createTransport({
            host: 'localhost',
            port: 1025,
            secure: false,
            tls: {
                rejectUnauthorized: false
            }
        });
    }
};
EmailService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(0, (0, _common.Inject)(_drizzle.DrizzleAsyncProvider)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _nodepostgres.NodePgDatabase === "undefined" ? Object : _nodepostgres.NodePgDatabase
    ])
], EmailService);

//# sourceMappingURL=email.service.js.map