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
import { Body, Controller, Get, Post, Req, Res, Session, UseFilters, UseGuards } from '@nestjs/common';
import { ErrorExceptionFilter } from '~/common/exceptions';
import { ZodValidationPipe } from '~/common/pipes';
import { EmailService, TemplateText } from '~/email';
import { forgotPasswordSchema, resetPasswordSchema, signinSchema, signupSchema, updateAccountInformationSchema, withIDSchema, } from './auth.dto';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
var AuthController = (function () {
    function AuthController(authService, emailService) {
        this.authService = authService;
        this.emailService = emailService;
    }
    AuthController.prototype.signin = function (body, session) {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.authService.signin(body)];
                    case 1:
                        data = _a.sent();
                        session.user = data;
                        console.log(session);
                        return [2, {
                                data: data,
                                message: 'AUTH_SIGNIN_SUCCESS',
                                state: 'success',
                            }];
                }
            });
        });
    };
    AuthController.prototype.signup = function (body) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.authService.signup(body)];
                    case 1:
                        user = _a.sent();
                        if (user) {
                            this.emailService.sendTestEmail({
                                subject: TemplateText.welcome.subject,
                                template: {
                                    args: {
                                        username: user.username,
                                    },
                                    name: 'welcome',
                                },
                                text: TemplateText.welcome.text,
                                to: user.email,
                            });
                        }
                        return [2, { data: user, message: 'AUTH_SIGNUP_SUCCESS', state: 'success' }];
                }
            });
        });
    };
    AuthController.prototype.signout = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, new Promise(function (resolve, reject) {
                        req.session.destroy(function (err) {
                            if (err) {
                                console.error('Session destruction error:', err);
                                reject({ message: 'Could not destroy session', state: 'error' });
                            }
                            else {
                                res.clearCookie('connect.sid');
                                resolve({ data: null, message: 'AUTH_SIGNOUT_SUCCESS', state: 'success' });
                            }
                        });
                    })];
            });
        });
    };
    AuthController.prototype.me = function (req, res, session) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.authService.getAccountInformation({
                            user_id: session.user.id,
                        })];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            console.log('hay');
                            return [2, new Promise(function (resolve, reject) {
                                    req.session.destroy(function (err) {
                                        if (err) {
                                            console.error('Session destruction error:', err);
                                            reject({ message: 'Could not destroy session', state: 'error' });
                                        }
                                        else {
                                            res.clearCookie('connect.sid');
                                            resolve({ message: 'AUTH_GET_ACCOUNT_INFORMATION_FAILED', state: 'error' });
                                        }
                                    });
                                })];
                        }
                        return [2, { data: user, message: 'AUTH_GET_ACCOUNT_INFORMATION_SUCCESS', state: 'success' }];
                }
            });
        });
    };
    AuthController.prototype.forgotPassword = function (body) {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4, this.authService.forgotPassword(body)];
                    case 1:
                        data = _b.sent();
                        if (data === null || data === void 0 ? void 0 : data.otp) {
                            this.emailService.sendTestEmail({
                                subject: TemplateText.forgot_password.subject,
                                template: {
                                    args: {
                                        code: (_a = data === null || data === void 0 ? void 0 : data.otp[0]) === null || _a === void 0 ? void 0 : _a.code,
                                    },
                                    name: 'forgot-password',
                                },
                                text: TemplateText.forgot_password.text,
                                to: body.email,
                            });
                        }
                        return [2, { data: data === null || data === void 0 ? void 0 : data.user, message: 'AUTH_FORGOT_PASSWORD_EMAIL_SENT', state: 'success' }];
                }
            });
        });
    };
    AuthController.prototype.resetPassword = function (body) {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.authService.resetPassword(body)];
                    case 1:
                        data = _a.sent();
                        return [2, { data: data, message: 'AUTH_RESET_PASSWORD_SUCCESS', state: 'success' }];
                }
            });
        });
    };
    AuthController.prototype.updateAccountInformation = function (body) {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.authService.updateAccountInformation(body)];
                    case 1:
                        data = _a.sent();
                        return [2, { data: data, message: 'AUTH_UPDATE_ACCOUNT_INFORMATION_SUCCESS', state: 'success' }];
                }
            });
        });
    };
    AuthController.prototype.verifyEmail = function (body) {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.authService.verifyCode(body)];
                    case 1:
                        data = _a.sent();
                        return [2, { data: data, state: 'success' }];
                }
            });
        });
    };
    AuthController.prototype.deleteAccount = function (body) {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.authService.deleteAccount(body)];
                    case 1:
                        data = _a.sent();
                        return [2, { data: data, message: 'AUTH_DELETE_ACCOUNT_SUCCESS', state: 'success' }];
                }
            });
        });
    };
    __decorate([
        Post('signin'),
        __param(0, Body(new ZodValidationPipe(signinSchema))),
        __param(1, Session()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Function, Object]),
        __metadata("design:returntype", Promise)
    ], AuthController.prototype, "signin", null);
    __decorate([
        Post('signup'),
        __param(0, Body(new ZodValidationPipe(signupSchema))),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Function]),
        __metadata("design:returntype", Promise)
    ], AuthController.prototype, "signup", null);
    __decorate([
        Get('signout'),
        UseGuards(AuthGuard),
        __param(0, Req()),
        __param(1, Res({ passthrough: true })),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", Promise)
    ], AuthController.prototype, "signout", null);
    __decorate([
        Get('me'),
        UseGuards(AuthGuard),
        __param(0, Req()),
        __param(1, Res({ passthrough: true })),
        __param(2, Session()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object, Object]),
        __metadata("design:returntype", Promise)
    ], AuthController.prototype, "me", null);
    __decorate([
        Post('forgot-password'),
        __param(0, Body(new ZodValidationPipe(forgotPasswordSchema))),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Function]),
        __metadata("design:returntype", Promise)
    ], AuthController.prototype, "forgotPassword", null);
    __decorate([
        Post('reset-password'),
        __param(0, Body(new ZodValidationPipe(resetPasswordSchema))),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Function]),
        __metadata("design:returntype", Promise)
    ], AuthController.prototype, "resetPassword", null);
    __decorate([
        Post('update-profile'),
        __param(0, Body(new ZodValidationPipe(updateAccountInformationSchema))),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Function]),
        __metadata("design:returntype", Promise)
    ], AuthController.prototype, "updateAccountInformation", null);
    __decorate([
        Post('verify-code'),
        __param(0, Body(new ZodValidationPipe(withIDSchema))),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Function]),
        __metadata("design:returntype", Promise)
    ], AuthController.prototype, "verifyEmail", null);
    __decorate([
        Post('delete-account'),
        __param(0, Body(new ZodValidationPipe(withIDSchema))),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Function]),
        __metadata("design:returntype", Promise)
    ], AuthController.prototype, "deleteAccount", null);
    AuthController = __decorate([
        Controller('auth'),
        UseFilters(ErrorExceptionFilter),
        __metadata("design:paramtypes", [AuthService,
            EmailService])
    ], AuthController);
    return AuthController;
}());
export { AuthController };
//# sourceMappingURL=auth.controller.js.map