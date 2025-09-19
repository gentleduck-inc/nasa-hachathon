"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AppModule", {
    enumerable: true,
    get: function() {
        return AppModule;
    }
});
const _common = require("@nestjs/common");
const _config = require("@nestjs/config");
const _auth = require("./auth");
const _chats = require("./chats");
const _drizzle = require("./drizzle");
const _waitlist = require("./waitlist");
const _email = require("./email");
const _emailconstants = /*#__PURE__*/ _interop_require_default(require("./email/email.constants"));
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
let AppModule = class AppModule {
};
AppModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            // WinstonModule.forRoot({
            //   transports: [
            //     new winston.transports.Console({
            //       format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
            //     }),
            //     new winston.transports.File({
            //       filename: 'logs/combined.log',
            //       format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
            //     }),
            //     new winston.transports.Http({
            //       host: 'logstash',
            //       port: 5000,
            //       path: '/',
            //       ssl: false,
            //     }),
            //   ],
            //   format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
            // }),
            _config.ConfigModule.forRoot({
                envFilePath: '.env',
                load: [
                    _emailconstants.default
                ],
                isGlobal: true
            }),
            _auth.AuthModule,
            _waitlist.WaitlistModule,
            _drizzle.DrizzleModule,
            _chats.ChatsModule,
            _email.EmailModule
        ],
        controllers: [],
        providers: []
    })
], AppModule);

//# sourceMappingURL=app.module.js.map