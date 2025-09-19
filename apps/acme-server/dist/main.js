"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _core = require("@nestjs/core");
const _swagger = require("@nestjs/swagger");
const _nestjszod = require("nestjs-zod");
const _redis = require("redis");
const _appmodule = require("./app.module");
const _auth = require("./auth");
async function bootstrap() {
    const app = await _core.NestFactory.create(_appmodule.AppModule);
    app.set('query parser', 'extended');
    app.setGlobalPrefix('v1');
    app.enableCors({
        origin: [
            'http://localhost:3001',
            'http://domain:3001'
        ],
        methods: 'GET,POST,PUT,PATCH,DELETE,OPTIONS',
        allowedHeaders: 'Content-Type,Authorization',
        credentials: true,
        optionsSuccessStatus: 204
    });
    const redisClient = (0, _redis.createClient)({
        url: process.env.REDIS_URL
    });
    await redisClient.connect();
    app.useWebSocketAdapter(new _auth.EventsAdapter(app, redisClient));
    // Swagger
    (0, _nestjszod.patchNestJsSwagger)();
    const config = new _swagger.DocumentBuilder().setTitle('Cats example').setDescription('The cats API description').setVersion('1.0').addTag('cats').build();
    const documentFactory = ()=>_swagger.SwaggerModule.createDocument(app, config);
    _swagger.SwaggerModule.setup('api', app, documentFactory);
    await app.listen(process.env.PORT ?? 3000);
}
bootstrap(); // what's an observable
 // what's db injections
 // what's the difference between middleware and interceptor

//# sourceMappingURL=main.js.map