"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _core = require("@nestjs/core");
const _swagger = require("@nestjs/swagger");
const _connectredis = require("connect-redis");
const _expresssession = /*#__PURE__*/ _interop_require_default(require("express-session"));
const _nestjszod = require("nestjs-zod");
const _redis = require("redis");
const _appmodule = require("./app.module");
const _auth = require("./auth");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
async function bootstrap() {
    const app = await _core.NestFactory.create(_appmodule.AppModule);
    app.set('query parser', 'extended');
    app.set('trust proxy', true);
    app.setGlobalPrefix('v1');
    app.enableCors({
        allowedHeaders: 'Content-Type,Authorization',
        credentials: true,
        methods: 'GET,POST,PUT,PATCH,DELETE,OPTIONS',
        optionsSuccessStatus: 204,
        origin: [
            'http://localhost:3001',
            'http://domain:3001'
        ]
    });
    const redisClient = (0, _redis.createClient)({
        url: process.env.REDIS_URL
    });
    await redisClient.connect();
    const _session = (0, _expresssession.default)({
        cookie: {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24,
            secure: false
        },
        resave: false,
        saveUninitialized: false,
        secret: process.env.SESSION_SECRET || 'keyboard cat',
        store: new _connectredis.RedisStore({
            client: redisClient,
            prefix: 'session:'
        })
    });
    app.use(_session);
    app.useWebSocketAdapter(new _auth.EventsAdapter(_session));
    // Swagger
    (0, _nestjszod.patchNestJsSwagger)();
    const config = new _swagger.DocumentBuilder().setTitle('acme acme Server').setDescription('The acme acme Server API description').setVersion('1.0').addTag('acme acme Server').build();
    const documentFactory = ()=>_swagger.SwaggerModule.createDocument(app, config);
    _swagger.SwaggerModule.setup('api', app, documentFactory);
    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

//# sourceMappingURL=main.js.map