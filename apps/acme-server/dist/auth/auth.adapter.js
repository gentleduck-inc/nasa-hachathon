"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "EventsAdapter", {
    enumerable: true,
    get: function() {
        return EventsAdapter;
    }
});
const _config = require("@nestjs/config");
const _platformsocketio = require("@nestjs/platform-socket.io");
const _connectredis = require("connect-redis");
const _expresssession = /*#__PURE__*/ _interop_require_default(require("express-session"));
const _expresssocketiosession = /*#__PURE__*/ _interop_require_default(require("express-socket.io-session"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
let EventsAdapter = class EventsAdapter extends _platformsocketio.IoAdapter {
    createIOServer(port, options) {
        const server = super.createIOServer(port, options);
        const configService = this.app.get(_config.ConfigService);
        const _session = (0, _expresssession.default)({
            store: new _connectredis.RedisStore({
                client: this.redisClient,
                prefix: 'session:'
            }),
            secret: process.env.SESSION_SECRET || 'keyboard cat',
            resave: false,
            saveUninitialized: true,
            cookie: {
                httpOnly: true,
                secure: false,
                maxAge: 1000 * 60 * 60 * 24
            }
        });
        this.app.use(_session);
        server.use(// @ts-ignore
        (0, _expresssocketiosession.default)(_session, {
            autoSave: true
        }));
        return server;
    }
    constructor(app, redisClient){
        super(app);
        this.app = app;
        this.redisClient = redisClient;
    }
};

//# sourceMappingURL=auth.adapter.js.map