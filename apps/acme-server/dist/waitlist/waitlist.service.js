"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WaitlistService", {
    enumerable: true,
    get: function() {
        return WaitlistService;
    }
});
const _common = require("@nestjs/common");
const _nodepostgres = require("drizzle-orm/node-postgres");
const _libs = require("../common/libs");
const _drizzle = require("../drizzle");
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
let WaitlistService = class WaitlistService {
    async addToWishlist(data) {
        try {
            const email = await this.db.insert(_drizzle.schema.wishlistTable).values({
                email: data.email
            }).returning();
            if (!email.length) {
                throw (0, _libs.throwError)('WAITLIST_FAILED_TO_ADD');
            }
            return email;
        } catch (error) {
            throw (0, _libs.throwError)('WAITLIST_ERROR');
        }
    }
    constructor(db){
        this.db = db;
    }
};
WaitlistService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(0, (0, _common.Inject)(_drizzle.DrizzleAsyncProvider)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _nodepostgres.NodePgDatabase === "undefined" ? Object : _nodepostgres.NodePgDatabase
    ])
], WaitlistService);

//# sourceMappingURL=waitlist.service.js.map