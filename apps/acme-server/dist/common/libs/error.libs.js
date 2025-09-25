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
    get throwError () {
        return throwError;
    },
    get throwWSError () {
        return throwWSError;
    }
});
const _websockets = require("@nestjs/websockets");
function throwError(string, cause) {
    throw new Error(string, {
        cause
    });
}
function throwWSError(string) {
    throw new _websockets.WsException(string);
}

//# sourceMappingURL=error.libs.js.map