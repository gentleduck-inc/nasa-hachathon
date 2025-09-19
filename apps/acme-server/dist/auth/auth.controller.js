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
const _express = require("express");
const _expresssession = require("express-session");
const _exceptions = require("../common/exceptions");
const _libs = require("../common/libs");
const _pipes = require("../common/pipes");
const _email = require("../email");
const _authdto = require("./auth.dto");
const _authguard = require("./auth.guard");
const _authservice = require("./auth.service");
const _authtypes = require("./auth.types");
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
    async signin(body, session, res) {
        const data = await this.authService.signin(body);
        if (data instanceof Error) {
            (0, _libs.throwError)('INVALID_CREDENTIALS');
            return {
                state: 'error',
                error: 'INVALID_CREDENTIALS',
                message: 'Invalid credentials'
            };
        }
        session.user = data;
        this.emailService.sendTestEmail('wezonaser50@gmail.com');
        return {
            state: 'success',
            data
        };
    }
    async signup(body) {
        const data = await this.authService.signup(body);
        return {
            state: 'success',
            data
        };
    }
    async signout(req, res) {
        req.session.destroy((err)=>{
            console.log('session destroyed' + err);
        });
        res.clearCookie('connect.sid');
        return {
            state: 'success',
            data: null
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
    _ts_param(2, (0, _common.Res)({
        passthrough: true
    })),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _authtypes.SigninDto === "undefined" ? Object : _authtypes.SigninDto,
        typeof _expresssession.SessionData === "undefined" ? Object : _expresssession.SessionData,
        typeof _express.Response === "undefined" ? Object : _express.Response
    ]),
    _ts_metadata("design:returntype", Promise)
], AuthController.prototype, "signin", null);
_ts_decorate([
    (0, _common.Post)('signup'),
    _ts_param(0, (0, _common.Body)(new _pipes.ZodValidationPipe(_authdto.signupSchema))),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _authtypes.SignupDto === "undefined" ? Object : _authtypes.SignupDto
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
        typeof _express.Request === "undefined" ? Object : _express.Request,
        typeof _express.Response === "undefined" ? Object : _express.Response
    ]),
    _ts_metadata("design:returntype", Promise)
], AuthController.prototype, "signout", null);
AuthController = _ts_decorate([
    (0, _common.Controller)('auth'),
    (0, _common.UseFilters)(_exceptions.ErrorExceptionFilter),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _authservice.AuthService === "undefined" ? Object : _authservice.AuthService,
        typeof _email.EmailService === "undefined" ? Object : _email.EmailService
    ])
], AuthController);

//# sourceMappingURL=auth.controller.js.map