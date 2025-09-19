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
    get ErrorExceptionFilter () {
        return ErrorExceptionFilter;
    },
    get WSErrorExceptionFilter () {
        return WSErrorExceptionFilter;
    }
});
const _common = require("@nestjs/common");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let ErrorExceptionFilter = class ErrorExceptionFilter {
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        console.log('🔥 Exception caught:', exception);
        response.status(500).json({
            state: 'error',
            error: exception.message
        });
    }
};
ErrorExceptionFilter = _ts_decorate([
    (0, _common.Catch)()
], ErrorExceptionFilter);
let WSErrorExceptionFilter = class WSErrorExceptionFilter {
    catch(exception, host) {
        const client = host.switchToWs().getClient();
        console.error('🔥 WebSocket Error:', exception);
        client.emit('error', {
            status: 'error',
            message: exception.message
        });
    }
};
WSErrorExceptionFilter = _ts_decorate([
    (0, _common.Catch)()
], WSErrorExceptionFilter);

//# sourceMappingURL=error.exception.js.map