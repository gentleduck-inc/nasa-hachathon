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
    get SigninDto () {
        return SigninDto;
    },
    get SignupDto () {
        return SignupDto;
    }
});
const _nestjszod = require("nestjs-zod");
const _authdto = require("./auth.dto");
let SigninDto = class SigninDto extends (0, _nestjszod.createZodDto)(_authdto.signinSchema) {
};
let SignupDto = class SignupDto extends (0, _nestjszod.createZodDto)(_authdto.signupSchema) {
};

//# sourceMappingURL=auth.types.js.map