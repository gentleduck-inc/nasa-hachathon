var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { createZodDto } from 'nestjs-zod';
import { forgotPasswordSchema, resetPasswordSchema, signinSchema, signupSchema, updateAccountInformationSchema, verifyCodeSchema, withIDSchema, } from './auth.dto';
var SigninDto = (function (_super) {
    __extends(SigninDto, _super);
    function SigninDto() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return SigninDto;
}(createZodDto(signinSchema)));
export { SigninDto };
var SignupDto = (function (_super) {
    __extends(SignupDto, _super);
    function SignupDto() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return SignupDto;
}(createZodDto(signupSchema)));
export { SignupDto };
var SignoutDto = (function (_super) {
    __extends(SignoutDto, _super);
    function SignoutDto() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return SignoutDto;
}(createZodDto(withIDSchema)));
export { SignoutDto };
var GetUserDto = (function (_super) {
    __extends(GetUserDto, _super);
    function GetUserDto() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return GetUserDto;
}(createZodDto(withIDSchema)));
export { GetUserDto };
var ForgotPasswordDto = (function (_super) {
    __extends(ForgotPasswordDto, _super);
    function ForgotPasswordDto() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ForgotPasswordDto;
}(createZodDto(forgotPasswordSchema)));
export { ForgotPasswordDto };
var ResetPasswordDto = (function (_super) {
    __extends(ResetPasswordDto, _super);
    function ResetPasswordDto() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ResetPasswordDto;
}(createZodDto(resetPasswordSchema)));
export { ResetPasswordDto };
var UpdateAccountInformationDto = (function (_super) {
    __extends(UpdateAccountInformationDto, _super);
    function UpdateAccountInformationDto() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return UpdateAccountInformationDto;
}(createZodDto(updateAccountInformationSchema)));
export { UpdateAccountInformationDto };
var DeleteUserDto = (function (_super) {
    __extends(DeleteUserDto, _super);
    function DeleteUserDto() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return DeleteUserDto;
}(createZodDto(withIDSchema)));
export { DeleteUserDto };
var VerifyCodeDto = (function (_super) {
    __extends(VerifyCodeDto, _super);
    function VerifyCodeDto() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return VerifyCodeDto;
}(createZodDto(verifyCodeSchema)));
export { VerifyCodeDto };
//# sourceMappingURL=auth.types.js.map