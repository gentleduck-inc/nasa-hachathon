"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return _default;
    }
});
const _config = require("@nestjs/config");
const _default = (0, _config.registerAs)('mailer', ()=>{
    return {
        transport: {
            service: process.env.MAIL_SERVICE,
            host: process.env.MAIL_HOST,
            port: Number.parseInt(process.env.MAIL_PORT, 10),
            auth: {
                user: process.env.MAIL_USERNAME,
                pass: process.env.MAIL_PASSWORD
            }
        },
        defaults: {
            from: {
                name: process.env.MAIL_FROM_NAME,
                address: process.env.MAIL_FROM_ADDRESS
            }
        }
    };
});

//# sourceMappingURL=email.constants.js.map