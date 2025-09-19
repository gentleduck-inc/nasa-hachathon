"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AuthError", {
    enumerable: true,
    get: function() {
        return AuthError;
    }
});
const _constants = require("../common/constants");
const AuthError = [
    // NOTE: AUTH_ERROR
    'INVALID_CREDENTIALS',
    'UNAUTHORIZED',
    'USERNAME_INVALID',
    'PASSWORD_INVALID',
    'REGISTRATION_FAILED',
    'SIGNIN_FAILED',
    'SIGNOUT_FAILED',
    ..._constants.ZodError
];

//# sourceMappingURL=auth.constants.js.map