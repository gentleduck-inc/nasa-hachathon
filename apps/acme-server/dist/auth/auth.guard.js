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
    get AuthGuard () {
        return AuthGuard;
    },
    get WSAuthGuard () {
        return WSAuthGuard;
    }
});
const _common = require("@nestjs/common");
const _libs = require("../common/libs");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let AuthGuard = class AuthGuard {
    canActivate(context) {
        if (context.switchToHttp().getRequest().session.user) return true;
        console.log(context.switchToHttp().getRequest().session);
        (0, _libs.throwError)('INVALID_CREDENTIALS');
        return false;
    }
};
AuthGuard = _ts_decorate([
    (0, _common.Injectable)()
], AuthGuard);
let WSAuthGuard = class WSAuthGuard {
    canActivate(context) {
        console.log('hay from ws guard');
        console.log(context.switchToWs().getData());
        // if (context.switchToWs().getData()) return true
        // console.log(context.switchToHttp().getRequest<Request>().session)
        //
        // throwError<AuthErrorType>('INVALID_CREDENTIALS')
        return false;
    }
};
WSAuthGuard = _ts_decorate([
    (0, _common.Injectable)()
], WSAuthGuard);

//# sourceMappingURL=auth.guard.js.map