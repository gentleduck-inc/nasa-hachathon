var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { Inject, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import otpGenerator from 'otp-generator';
import { PasswordHasher, throwError } from '~/common/libs';
import { DrizzleAsyncProvider, schema } from '~/drizzle';
var AuthService = (function () {
    function AuthService(db) {
        this.db = db;
    }
    AuthService.prototype.signin = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var _user, passwordMatch, _, user, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4, this.db.query.users.findFirst({
                                where: eq(schema.users.username, data.username),
                            })];
                    case 1:
                        _user = _a.sent();
                        if (!_user) {
                            throwError('AUTH_USERNAME_INVALID', 401);
                            return [2];
                        }
                        return [4, PasswordHasher.comparePassword(data.password, _user.password_hash)];
                    case 2:
                        passwordMatch = _a.sent();
                        if (!passwordMatch) {
                            throwError('AUTH_PASSWORD_INVALID', 401);
                            return [2];
                        }
                        _ = _user.password_hash, user = __rest(_user, ["password_hash"]);
                        return [2, user];
                    case 3:
                        error_1 = _a.sent();
                        console.log(error_1);
                        throwError('AUTH_SIGNIN_FAILED', 500);
                        return [2];
                    case 4: return [2];
                }
            });
        });
    };
    AuthService.prototype.signup = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var password_hash, insertedUsers, user, _, safeUser, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4, PasswordHasher.hashPassword(data.password)];
                    case 1:
                        password_hash = _a.sent();
                        return [4, this.db
                                .insert(schema.users)
                                .values({
                                email: data.email,
                                first_name: data.firstName,
                                last_name: data.lastName,
                                password_hash: password_hash,
                                username: data.username,
                            })
                                .returning()];
                    case 2:
                        insertedUsers = _a.sent();
                        if (!(insertedUsers === null || insertedUsers === void 0 ? void 0 : insertedUsers.length)) {
                            throwError('AUTH_REGISTRATION_FAILED', 500);
                            return [2];
                        }
                        user = insertedUsers[0];
                        _ = user.password_hash, safeUser = __rest(user, ["password_hash"]);
                        return [2, safeUser];
                    case 3:
                        error_2 = _a.sent();
                        if (String(error_2.cause).includes('user_table_user_name_unique')) {
                            throwError('AUTH_USERNAME_ALREADY_EXISTS', 409);
                            return [2];
                        }
                        if (String(error_2.cause).includes('user_table_email_unique')) {
                            throwError('AUTH_EMAIL_ALREADY_EXISTS', 409);
                            return [2];
                        }
                        throwError('AUTH_REGISTRATION_FAILED', 500);
                        return [3, 4];
                    case 4: return [2];
                }
            });
        });
    };
    AuthService.prototype.getAccountInformation = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var user, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, this.db.query.users.findFirst({
                                columns: {
                                    avatar_url: true,
                                    email: true,
                                    first_name: true,
                                    id: true,
                                    last_name: true,
                                    role: true,
                                    settings: true,
                                    username: true,
                                },
                                where: eq(schema.users.id, data.user_id),
                            })];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            throwError('AUTH_USER_NOT_FOUND_OR_UNAUTHORIZED', 401);
                            return [2];
                        }
                        return [2, user];
                    case 2:
                        error_3 = _a.sent();
                        console.log(error_3);
                        throwError('AUTH_GET_ACCOUNT_INFORMATION_FAILED', 500);
                        return [2];
                    case 3: return [2];
                }
            });
        });
    };
    AuthService.prototype.forgotPassword = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var user, OTP, expires_at, otp, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4, this.db.query.users.findFirst({
                                where: eq(schema.users.email, data.email),
                            })];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            throwError('AUTH_USER_NOT_FOUND', 404);
                            return [2];
                        }
                        OTP = otpGenerator.generate(6, {
                            lowerCaseAlphabets: true,
                            specialChars: true,
                            upperCaseAlphabets: true,
                        });
                        expires_at = new Date(Date.now() + 60000 * 10);
                        return [4, this.db
                                .insert(schema.otpCodes)
                                .values(__assign(__assign({ code: OTP, user_id: user === null || user === void 0 ? void 0 : user.id }, data), { expires_at: expires_at }))
                                .returning()];
                    case 2:
                        otp = _a.sent();
                        if (!(otp === null || otp === void 0 ? void 0 : otp.length)) {
                            throwError('AUTH_FORGOT_PASSWORD_FAILED', 500);
                            return [2];
                        }
                        return [2, { otp: otp, user: user }];
                    case 3:
                        error_4 = _a.sent();
                        console.log(error_4);
                        throwError('AUTH_FORGOT_PASSWORD_FAILED', 500);
                        return [2];
                    case 4: return [2];
                }
            });
        });
    };
    AuthService.prototype.resetPassword = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var password_hash, user, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4, PasswordHasher.hashPassword(data.password_hash)];
                    case 1:
                        password_hash = _a.sent();
                        data.password_hash = password_hash;
                        console.log(data);
                        return [4, this.db
                                .update(schema.users)
                                .set(__assign({}, data))
                                .where(eq(schema.users.id, data.user_id))
                                .returning()];
                    case 2:
                        user = _a.sent();
                        console.log(user);
                        if (!(user === null || user === void 0 ? void 0 : user.length)) {
                            throwError('AUTH_USER_NOT_FOUND_OR_RESET_PASSWORD_FAILED', 500);
                            return [2];
                        }
                        return [2, user];
                    case 3:
                        error_5 = _a.sent();
                        console.log(error_5);
                        throwError('AUTH_RESET_PASSWORD_FAILED', 500);
                        return [2];
                    case 4: return [2];
                }
            });
        });
    };
    AuthService.prototype.updateAccountInformation = function (_a) {
        return __awaiter(this, void 0, void 0, function () {
            var user, error_6;
            var user_id = _a.user_id, data = __rest(_a, ["user_id"]);
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4, this.db
                                .update(schema.users)
                                .set(__assign({}, data))
                                .where(eq(schema.users.id, user_id))
                                .returning()];
                    case 1:
                        user = _b.sent();
                        if (!(user === null || user === void 0 ? void 0 : user.length)) {
                            throwError('AUTH_USER_NOT_FOUND_OR_UPDATE_ACCOUNT_INFORMATION_FAILED', 500);
                            return [2];
                        }
                        return [2, user];
                    case 2:
                        error_6 = _b.sent();
                        console.log(error_6);
                        throwError('AUTH_UPDATE_ACCOUNT_INFORMATION_FAILED', 500);
                        return [2];
                    case 3: return [2];
                }
            });
        });
    };
    AuthService.prototype.verifyCode = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var otp, error_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, this.db.delete(schema.otpCodes).where(eq(schema.otpCodes.user_id, data.user_id)).returning()];
                    case 1:
                        otp = _a.sent();
                        console.log(otp);
                        if (!(otp === null || otp === void 0 ? void 0 : otp.length)) {
                            throwError('AUTH_USER_NOT_FOUND_OR_VERIFY_CODE_FAILED', 500);
                            return [2];
                        }
                        return [2, null];
                    case 2:
                        error_7 = _a.sent();
                        console.log(error_7);
                        throwError('AUTH_VERIFY_CODE_FAILED', 500);
                        return [2];
                    case 3: return [2];
                }
            });
        });
    };
    AuthService.prototype.deleteAccount = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var user, error_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, this.db.delete(schema.users).where(eq(schema.users.id, data.user_id)).returning()];
                    case 1:
                        user = _a.sent();
                        if (!(user === null || user === void 0 ? void 0 : user.length)) {
                            throwError('AUTH_USER_NOT_FOUND_OR_DELETE_ACCOUNT_FAILED', 500);
                            return [2];
                        }
                        return [2, null];
                    case 2:
                        error_8 = _a.sent();
                        console.log(error_8);
                        throwError('AUTH_DELETE_ACCOUNT_FAILED', 500);
                        return [2];
                    case 3: return [2];
                }
            });
        });
    };
    AuthService = __decorate([
        Injectable(),
        __param(0, Inject(DrizzleAsyncProvider)),
        __metadata("design:paramtypes", [Function])
    ], AuthService);
    return AuthService;
}());
export { AuthService };
//# sourceMappingURL=auth.service.js.map