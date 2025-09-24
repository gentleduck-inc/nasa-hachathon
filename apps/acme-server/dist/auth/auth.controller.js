"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AuthController", {
    enumerable: true,
    get: function() {
        return AuthController;
    }
});
const _common = require("@nestjs/common");
const _exceptions = require("../common/exceptions");
const _pipes = require("../common/pipes");
const _email = require("../email");
const _authdto = require("./auth.dto");
const _authguard = require("./auth.guard");
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
let AuthController = class AuthController {
    async signin(body, session) {
        try {
            console.log(session);
            const data = await this.authService.signin(body);
            session.user = data;
            // session = { ...session, user: data! }
            return {
                data,
                message: 'AUTH_SIGNIN_SUCCESS',
                state: 'success'
            };
        } catch (error) {
            console.log(error);
            return {
                message: 'AUTH_SIGNIN_FAILED',
                state: 'error'
            };
        }
    }
    async signup(body) {
        const user = await this.authService.signup(body);
        if (user) {
            this.emailService.sendTestEmail({
                subject: _email.TemplateText.welcome.subject,
                template: {
                    args: {
                        username: user.username
                    },
                    name: 'welcome'
                },
                text: _email.TemplateText.welcome.text,
                to: user.email
            });
        }
        return {
            data: user,
            message: 'AUTH_SIGNUP_SUCCESS',
            state: 'success'
        };
    }
    async signout(req, res) {
        return new Promise((resolve, reject)=>{
            req.session.destroy((err)=>{
                if (err) {
                    console.error('Session destruction error:', err);
                    reject({
                        message: 'Could not destroy session',
                        state: 'error'
                    });
                } else {
                    res.clearCookie('connect.sid');
                    resolve({
                        data: null,
                        message: 'AUTH_SIGNOUT_SUCCESS',
                        state: 'success'
                    });
                }
            });
        });
    }
    async me(body) {
        const user = await this.authService.getAccountInformation(body);
        return {
            data: user,
            message: 'AUTH_GET_ACCOUNT_INFORMATION_SUCCESS',
            state: 'success'
        };
    }
    async forgotPassword(body) {
        const data = await this.authService.forgotPassword(body);
        if (data?.otp) {
            this.emailService.sendTestEmail({
                subject: _email.TemplateText.forgot_password.subject,
                template: {
                    args: {
                        code: data?.otp[0]?.code
                    },
                    name: 'forgot-password'
                },
                text: _email.TemplateText.forgot_password.text,
                to: body.email
            });
        }
        return {
            data: data?.user,
            message: 'AUTH_FORGOT_PASSWORD_EMAIL_SENT',
            state: 'success'
        };
    }
    async resetPassword(body) {
        const data = await this.authService.resetPassword(body);
        return {
            data,
            message: 'AUTH_RESET_PASSWORD_SUCCESS',
            state: 'success'
        };
    }
    async updateAccountInformation(body) {
        const data = await this.authService.updateAccountInformation(body);
        return {
            data,
            message: 'AUTH_UPDATE_ACCOUNT_INFORMATION_SUCCESS',
            state: 'success'
        };
    }
    async verifyEmail(body) {
        const data = await this.authService.verifyCode(body);
        return {
            data,
            state: 'success'
        };
    }
    async deleteAccount(body) {
        const data = await this.authService.deleteAccount(body);
        return {
            data,
            message: 'AUTH_DELETE_ACCOUNT_SUCCESS',
            state: 'success'
        };
    }
    constructor(authService, emailService){
        this.authService = authService;
        this.emailService = emailService;
    }
};
_ts_decorate([
    (0, _common.Post)('signin'),
    _ts_param(0, (0, _common.Body)(new _pipes.ZodValidationPipe(_authdto.signinSchema))),
    _ts_param(1, (0, _common.Session)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof SigninDto === "undefined" ? Object : SigninDto,
        typeof SessionData === "undefined" ? Object : SessionData
    ]),
    _ts_metadata("design:returntype", Promise)
], AuthController.prototype, "signin", null);
_ts_decorate([
    (0, _common.Post)('signup'),
    _ts_param(0, (0, _common.Body)(new _pipes.ZodValidationPipe(_authdto.signupSchema))),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof SignupDto === "undefined" ? Object : SignupDto
    ]),
    _ts_metadata("design:returntype", Promise)
], AuthController.prototype, "signup", null);
_ts_decorate([
    (0, _common.Get)('signout'),
    (0, _common.UseGuards)(_authguard.AuthGuard),
    _ts_param(0, (0, _common.Req)()),
    _ts_param(1, (0, _common.Res)({
        passthrough: true
    })),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof Request === "undefined" ? Object : Request,
        typeof Response === "undefined" ? Object : Response
    ]),
    _ts_metadata("design:returntype", Promise)
], AuthController.prototype, "signout", null);
_ts_decorate([
    (0, _common.Get)('me'),
    (0, _common.UseGuards)(_authguard.AuthGuard),
    _ts_param(0, (0, _common.Body)(new _pipes.ZodValidationPipe(_authdto.withIDSchema))),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof GetUserDto === "undefined" ? Object : GetUserDto
    ]),
    _ts_metadata("design:returntype", Promise)
], AuthController.prototype, "me", null);
_ts_decorate([
    (0, _common.Post)('forgot-password'),
    _ts_param(0, (0, _common.Body)(new _pipes.ZodValidationPipe(_authdto.forgotPasswordSchema))),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof ForgotPasswordDto === "undefined" ? Object : ForgotPasswordDto
    ]),
    _ts_metadata("design:returntype", Promise)
], AuthController.prototype, "forgotPassword", null);
_ts_decorate([
    (0, _common.Post)('reset-password'),
    _ts_param(0, (0, _common.Body)(new _pipes.ZodValidationPipe(_authdto.resetPasswordSchema))),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof ResetPasswordDto === "undefined" ? Object : ResetPasswordDto
    ]),
    _ts_metadata("design:returntype", Promise)
], AuthController.prototype, "resetPassword", null);
_ts_decorate([
    (0, _common.Post)('update-profile'),
    _ts_param(0, (0, _common.Body)(new _pipes.ZodValidationPipe(_authdto.updateAccountInformationSchema))),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof UpdateAccountInformationDto === "undefined" ? Object : UpdateAccountInformationDto
    ]),
    _ts_metadata("design:returntype", Promise)
], AuthController.prototype, "updateAccountInformation", null);
_ts_decorate([
    (0, _common.Post)('verify-code'),
    _ts_param(0, (0, _common.Body)(new _pipes.ZodValidationPipe(_authdto.withIDSchema))),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof VerifyCodeDto === "undefined" ? Object : VerifyCodeDto
    ]),
    _ts_metadata("design:returntype", Promise)
], AuthController.prototype, "verifyEmail", null);
_ts_decorate([
    (0, _common.Post)('delete-account'),
    _ts_param(0, (0, _common.Body)(new _pipes.ZodValidationPipe(_authdto.withIDSchema))),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof GetUserDto === "undefined" ? Object : GetUserDto
    ]),
    _ts_metadata("design:returntype", Promise)
], AuthController.prototype, "deleteAccount", null);
AuthController = _ts_decorate([
    (0, _common.Controller)('auth'),
    (0, _common.UseFilters)(_exceptions.ErrorExceptionFilter),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof AuthService === "undefined" ? Object : AuthService,
        typeof EmailService === "undefined" ? Object : EmailService
    ])
], AuthController);

//# sourceMappingURL=auth.controller.js.map