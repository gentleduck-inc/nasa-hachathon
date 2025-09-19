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
    get signinSchema () {
        return signinSchema;
    },
    get signupSchema () {
        return signupSchema;
    }
});
const _zod = require("zod");
const errorMessage = (message)=>({
        message
    });
const signinSchema = _zod.z.object({
    username: _zod.z.string().min(3, {
        ...errorMessage('ZOD_TOO_SHORT')
    }).max(30, {
        ...errorMessage('ZOD_TOO_LONG')
    }),
    password: _zod.z.string().min(8, {
        ...errorMessage('ZOD_TOO_SHORT')
    }).max(30, {
        ...errorMessage('ZOD_TOO_LONG')
    })
});
const signupSchema = _zod.z.object({
    email: _zod.z.string().email({
        ...errorMessage('ZOD_INVALID')
    }),
    username: _zod.z.string().min(3, {
        ...errorMessage('ZOD_TOO_SHORT')
    }).max(30, {
        ...errorMessage('ZOD_TOO_LONG')
    }),
    password: _zod.z.string().min(8, {
        ...errorMessage('ZOD_TOO_SHORT')
    }).max(30, {
        ...errorMessage('ZOD_TOO_LONG')
    })
});

//# sourceMappingURL=auth.dto.js.map