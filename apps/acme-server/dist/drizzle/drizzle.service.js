"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: Object.getOwnPropertyDescriptor(all, name).get
    });
}
_export(exports, {
    get DrizzleAsyncProvider () {
        return DrizzleAsyncProvider;
    },
    get drizzleProvider () {
        return drizzleProvider;
    },
    get schema () {
        return _db.schema;
    }
});
const _db = require("@acme/db");
const _config = require("@nestjs/config");
const _nodepostgres = require("drizzle-orm/node-postgres");
const _pg = require("pg");
const DrizzleAsyncProvider = 'DrizzleAsyncProvider';
const drizzleProvider = [
    {
        inject: [
            _config.ConfigService
        ],
        provide: DrizzleAsyncProvider,
        useFactory: async (configService)=>{
            const connectionString = configService.get('DATABASE_URL');
            const pool = new _pg.Pool({
                connectionString
            });
            const _drizzle = (0, _nodepostgres.drizzle)(pool, {
                casing: 'snake_case',
                schema: _db.schema
            });
            console.log('✅ Drizzle Connection initialized');
            return _drizzle;
        }
    }
];

//# sourceMappingURL=drizzle.service.js.map