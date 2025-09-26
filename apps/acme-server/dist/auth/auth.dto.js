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
import { z } from 'zod';
var errorMessage = function (message) { return ({ message: message }); };
var string = z.string(__assign({}, errorMessage('ZOD_EXPECTED_STRING'))).max(30, __assign({}, errorMessage('ZOD_TOO_LONG')));
export var signinSchema = z.object({
    password: string.min(8, __assign({}, errorMessage('ZOD_TOO_SHORT'))),
    username: string.min(3, __assign({}, errorMessage('ZOD_TOO_SHORT'))),
});
export var signupSchema = signinSchema.extend({
    email: z.string(__assign({}, errorMessage('ZOD_EXPECTED_STRING'))).email(__assign({}, errorMessage('ZOD_INVALID'))),
    firstName: string.min(3, __assign({}, errorMessage('ZOD_TOO_SHORT'))),
    lastName: string.min(3, __assign({}, errorMessage('ZOD_TOO_SHORT'))),
    username: string.min(3, __assign({}, errorMessage('ZOD_TOO_SHORT'))),
});
export var withIDSchema = z.object({
    user_id: z.string(__assign({}, errorMessage('ZOD_EXPECTED_STRING'))),
});
export var forgotPasswordSchema = signupSchema.pick({ email: true });
export var resetPasswordSchema = withIDSchema.extend({
    password_hash: string.min(8, __assign({}, errorMessage('ZOD_TOO_SHORT'))),
});
export var updateAccountInformationSchema = withIDSchema.merge(signupSchema.partial());
export var verifyCodeSchema = resetPasswordSchema.omit({ password_hash: true }).extend({
    otp: z.string(__assign({}, errorMessage('ZOD_EXPECTED_STRING'))).min(6, __assign({}, errorMessage('ZOD_TOO_SHORT'))),
});
//# sourceMappingURL=auth.dto.js.map