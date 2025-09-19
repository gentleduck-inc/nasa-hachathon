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
        return schema;
    }
});
const _tables = require("@aiv/db/tables");
const _config = require("@nestjs/config");
const _nodepostgres = require("drizzle-orm/node-postgres");
const _pg = require("pg");
const schema = {
    ..._tables.tables,
    ..._tables._relations
};
const DrizzleAsyncProvider = 'DrizzleAsyncProvider';
const drizzleProvider = [
    {
        provide: DrizzleAsyncProvider,
        inject: [
            _config.ConfigService
        ],
        useFactory: async (configService)=>{
            const connectionString = configService.get('NEON_DATABASE_URL');
            console.log(connectionString);
            const pool = new _pg.Pool({
                connectionString
            });
            const _drizzle = (0, _nodepostgres.drizzle)(pool, {
                schema
            });
            console.log('✅ Drizzle Connection initialized');
            return _drizzle;
        }
    }
];

//# sourceMappingURL=drizzle.service.js.map