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
    get forgotPasswordSchema () {
        return forgotPasswordSchema;
    },
    get resetPasswordSchema () {
        return resetPasswordSchema;
    },
    get signinSchema () {
        return signinSchema;
    },
    get signupSchema () {
        return signupSchema;
    },
    get updateAccountInformationSchema () {
        return updateAccountInformationSchema;
    },
    get verifyCodeSchema () {
        return verifyCodeSchema;
    },
    get withIDSchema () {
        return withIDSchema;
    }
});
const _zod = require("zod");
const errorMessage = (message)=>({
        message
    });
const string = _zod.z.string({
    ...errorMessage('ZOD_EXPECTED_STRING')
}).min(8, {
    ...errorMessage('ZOD_TOO_SHORT')
}).max(30, {
    ...errorMessage('ZOD_TOO_LONG')
});
const signinSchema = _zod.z.object({
    password: string,
    username: string
});
const signupSchema = signinSchema.extend({
    email: _zod.z.string({
        ...errorMessage('ZOD_EXPECTED_STRING')
    }).email({
        ...errorMessage('ZOD_INVALID')
    }),
    firstName: string.min(3, {
        ...errorMessage('ZOD_TOO_SHORT')
    }),
    lastName: string.min(3, {
        ...errorMessage('ZOD_TOO_SHORT')
    }),
    username: string.min(3, {
        ...errorMessage('ZOD_TOO_SHORT')
    })
});
const withIDSchema = _zod.z.object({
    user_id: _zod.z.string({
        ...errorMessage('ZOD_EXPECTED_STRING')
    })
});
const forgotPasswordSchema = signupSchema.pick({
    email: true
});
const resetPasswordSchema = withIDSchema.extend({
    password_hash: string
});
const updateAccountInformationSchema = withIDSchema.merge(signupSchema.partial());
const verifyCodeSchema = resetPasswordSchema.omit({
    password_hash: true
}).extend({
    otp: _zod.z.string({
        ...errorMessage('ZOD_EXPECTED_STRING')
    }).min(6, {
        ...errorMessage('ZOD_TOO_SHORT')
    })
});

//# sourceMappingURL=auth.dto.js.map