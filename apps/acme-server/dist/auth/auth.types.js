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
    get DeleteUserDto () {
        return DeleteUserDto;
    },
    get ForgotPasswordDto () {
        return ForgotPasswordDto;
    },
    get GetUserDto () {
        return GetUserDto;
    },
    get ResetPasswordDto () {
        return ResetPasswordDto;
    },
    get SigninDto () {
        return SigninDto;
    },
    get SignoutDto () {
        return SignoutDto;
    },
    get SignupDto () {
        return SignupDto;
    },
    get UpdateAccountInformationDto () {
        return UpdateAccountInformationDto;
    },
    get VerifyCodeDto () {
        return VerifyCodeDto;
    }
});
const _nestjszod = require("nestjs-zod");
const _authdto = require("./auth.dto");
let SigninDto = class SigninDto extends (0, _nestjszod.createZodDto)(_authdto.signinSchema) {
};
let SignupDto = class SignupDto extends (0, _nestjszod.createZodDto)(_authdto.signupSchema) {
};
let SignoutDto = class SignoutDto extends (0, _nestjszod.createZodDto)(_authdto.withIDSchema) {
};
let GetUserDto = class GetUserDto extends (0, _nestjszod.createZodDto)(_authdto.withIDSchema) {
};
let ForgotPasswordDto = class ForgotPasswordDto extends (0, _nestjszod.createZodDto)(_authdto.forgotPasswordSchema) {
};
let ResetPasswordDto = class ResetPasswordDto extends (0, _nestjszod.createZodDto)(_authdto.resetPasswordSchema) {
};
let UpdateAccountInformationDto = class UpdateAccountInformationDto extends (0, _nestjszod.createZodDto)(_authdto.updateAccountInformationSchema) {
};
let DeleteUserDto = class DeleteUserDto extends (0, _nestjszod.createZodDto)(_authdto.withIDSchema) {
};
let VerifyCodeDto = class VerifyCodeDto extends (0, _nestjszod.createZodDto)(_authdto.verifyCodeSchema) {
};

//# sourceMappingURL=auth.types.js.map