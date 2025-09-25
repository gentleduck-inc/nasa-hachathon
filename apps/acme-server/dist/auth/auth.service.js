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
const _otpgenerator = /*#__PURE__*/ _interop_require_default(require("otp-generator"));
const _libs = require("../common/libs");
const _drizzle = require("../drizzle");
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
            const _user = await this.db.query.users.findFirst({
                where: (0, _drizzleorm.eq)(_drizzle.schema.users.username, data.username)
            });
            if (!_user) {
                (0, _libs.throwError)('AUTH_USERNAME_INVALID');
                return;
            }
            const passwordMatch = await _libs.PasswordHasher.comparePassword(data.password, _user.password_hash);
            if (!passwordMatch) {
                (0, _libs.throwError)('AUTH_PASSWORD_INVALID');
                return;
            }
            // omit password
            const { password_hash: _, ...user } = _user;
            return user;
        } catch (error) {
            console.log(error);
            (0, _libs.throwError)('AUTH_SIGNIN_FAILED');
            return;
        }
    }
    async signup(data) {
        try {
            const password_hash = await _libs.PasswordHasher.hashPassword(data.password);
            const insertedUsers = await this.db.insert(_drizzle.schema.users).values({
                email: data.email,
                first_name: data.firstName,
                last_name: data.lastName,
                password_hash,
                username: data.username
            }).returning();
            if (!insertedUsers?.length) {
                (0, _libs.throwError)('AUTH_REGISTRATION_FAILED');
                return;
            }
            const user = insertedUsers[0];
            const { password_hash: _, ...safeUser } = user;
            return safeUser;
        } catch (error) {
            if (String(error.cause).includes('user_table_user_name_unique')) {
                (0, _libs.throwError)('AUTH_USERNAME_ALREADY_EXISTS');
                return;
            }
            if (String(error.cause).includes('user_table_email_unique')) {
                (0, _libs.throwError)('AUTH_EMAIL_ALREADY_EXISTS');
                return;
            }
            (0, _libs.throwError)('AUTH_REGISTRATION_FAILED');
        }
    }
    async getAccountInformation(data) {
        try {
            const user = await this.db.query.users.findFirst({
                columns: {
                    email: true,
                    first_name: true,
                    id: true,
                    last_name: true
                },
                where: (0, _drizzleorm.eq)(_drizzle.schema.users.id, data.user_id)
            });
            if (!user) {
                (0, _libs.throwError)('AUTH_USER_NOT_FOUND_OR_UNAUTHORIZED');
                return;
            }
            return user;
        } catch (error) {
            console.log(error);
            (0, _libs.throwError)('AUTH_GET_ACCOUNT_INFORMATION_FAILED');
            return;
        }
    }
    async forgotPassword(data) {
        try {
            const user = await this.db.query.users.findFirst({
                where: (0, _drizzleorm.eq)(_drizzle.schema.users.email, data.email)
            });
            if (!user) {
                (0, _libs.throwError)('AUTH_USER_NOT_FOUND');
                return;
            }
            const OTP = _otpgenerator.default.generate(6, {
                lowerCaseAlphabets: true,
                specialChars: true,
                upperCaseAlphabets: true
            });
            const expires_at = new Date(Date.now() + 60000 * 10);
            const otp = await this.db.insert(_drizzle.schema.otpCodes).values({
                code: OTP,
                user_id: user?.id,
                ...data,
                expires_at
            }).returning();
            if (!otp?.length) {
                (0, _libs.throwError)('AUTH_FORGOT_PASSWORD_FAILED');
                return;
            }
            return {
                otp,
                user
            };
        } catch (error) {
            console.log(error);
            (0, _libs.throwError)('AUTH_FORGOT_PASSWORD_FAILED');
            return;
        }
    }
    async resetPassword(data) {
        try {
            const password_hash = await _libs.PasswordHasher.hashPassword(data.password_hash);
            data.password_hash = password_hash;
            console.log(data);
            const user = await this.db.update(_drizzle.schema.users).set({
                ...data
            }).where((0, _drizzleorm.eq)(_drizzle.schema.users.id, data.user_id)).returning();
            console.log(user);
            if (!user?.length) {
                (0, _libs.throwError)('AUTH_USER_NOT_FOUND_OR_RESET_PASSWORD_FAILED');
                return;
            }
            return user;
        } catch (error) {
            console.log(error);
            (0, _libs.throwError)('AUTH_RESET_PASSWORD_FAILED');
            return;
        }
    }
    async updateAccountInformation({ user_id, ...data }) {
        try {
            const user = await this.db.update(_drizzle.schema.users).set({
                ...data
            }).where((0, _drizzleorm.eq)(_drizzle.schema.users.id, user_id)).returning();
            if (!user?.length) {
                (0, _libs.throwError)('AUTH_USER_NOT_FOUND_OR_UPDATE_ACCOUNT_INFORMATION_FAILED');
                return;
            }
            return user;
        } catch (error) {
            console.log(error);
            (0, _libs.throwError)('AUTH_UPDATE_ACCOUNT_INFORMATION_FAILED');
            return;
        }
    }
    async verifyCode(data) {
        try {
            const otp = await this.db.delete(_drizzle.schema.otpCodes).where((0, _drizzleorm.eq)(_drizzle.schema.otpCodes.user_id, data.user_id)).returning();
            console.log(otp);
            if (!otp?.length) {
                (0, _libs.throwError)('AUTH_USER_NOT_FOUND_OR_VERIFY_CODE_FAILED');
                return;
            }
            return null;
        } catch (error) {
            console.log(error);
            (0, _libs.throwError)('AUTH_VERIFY_CODE_FAILED');
            return;
        }
    }
    async deleteAccount(data) {
        try {
            const user = await this.db.delete(_drizzle.schema.users).where((0, _drizzleorm.eq)(_drizzle.schema.users.id, data.user_id)).returning();
            if (!user?.length) {
                (0, _libs.throwError)('AUTH_USER_NOT_FOUND_OR_DELETE_ACCOUNT_FAILED');
                return;
            }
            return null;
        } catch (error) {
            console.log(error);
            (0, _libs.throwError)('AUTH_DELETE_ACCOUNT_FAILED');
            return;
        }
    }
    constructor(db){
        this.db = db;
    }
};
AuthService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(0, (0, _common.Inject)(_drizzle.DrizzleAsyncProvider)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof NodePgDatabase === "undefined" ? Object : NodePgDatabase
    ])
], AuthService);

//# sourceMappingURL=auth.service.js.map