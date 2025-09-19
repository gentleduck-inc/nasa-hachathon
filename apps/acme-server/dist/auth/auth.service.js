"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AuthService", {
    enumerable: true,
    get: function() {
        return AuthService;
    }
});
const _common = require("@nestjs/common");
const _drizzleorm = require("drizzle-orm");
const _nodepostgres = require("drizzle-orm/node-postgres");
const _uuidv7 = require("uuidv7");
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
let AuthService = class AuthService {
    async signin(data) {
        try {
            const _user = await this.db.query.userTable.findFirst({
                where: (0, _drizzleorm.eq)(_drizzle.schema.userTable.userName, data.username)
            });
            console.log(_user, data);
            if (!_user) {
                return (0, _libs.throwError)('USERNAME_INVALID');
            }
            const passwordMatch = await _libs.PasswordHasher.comparePassword(data.password, _user.password);
            if (!passwordMatch) {
                return (0, _libs.throwError)('PASSWORD_INVALID');
            }
            // omit password
            const { password: _, ...user } = _user;
            return user;
        } catch (error) {
            console.log(error);
            return (0, _libs.throwError)('SIGNIN_FAILED');
        }
    }
    async signup(data) {
        try {
            const password = await _libs.PasswordHasher.hashPassword(data.password);
            console.log(password);
            const insertedUsers = await this.db.insert(_drizzle.schema.userTable).values({
                id: (0, _uuidv7.uuidv7)(),
                // FIX: change the useranme to be name
                name: data.username,
                userName: data.username,
                email: data.email,
                password
            }).returning();
            const user = insertedUsers[0];
            const { password: _, ...safeUser } = user;
            return safeUser;
        } catch (error) {
            console.log(error);
            return (0, _libs.throwError)('REGISTRATION_FAILED');
        }
    }
    async signout() {
        try {
            const users = await this.db.select().from(_drizzle.schema.userTable);
            return users;
        } catch (error) {
            console.log(error);
            return (0, _libs.throwError)('SIGNOUT_FAILED');
        }
    }
    async forgotPassword() {}
    async resetPassword() {}
    async verifyEmail() {}
    async deleteAccount() {}
    async updateAccountInformation() {}
    constructor(db){
        this.db = db;
    }
};
AuthService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(0, (0, _common.Inject)(_drizzle.DrizzleAsyncProvider)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _nodepostgres.NodePgDatabase === "undefined" ? Object : _nodepostgres.NodePgDatabase
    ])
], AuthService);

//# sourceMappingURL=auth.service.js.map