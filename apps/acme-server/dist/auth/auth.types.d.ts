import type { AuthMessages } from './auth.constants';
export type AuthMessageType = (typeof AuthMessages)[number];
declare const SigninDto_base: import("nestjs-zod").ZodDto<{
    username: string;
    password: string;
}, import("zod").ZodObjectDef<{
    password: import("zod").ZodString;
    username: import("zod").ZodString;
}, "strip", import("zod").ZodTypeAny>, {
    username: string;
    password: string;
}>;
export declare class SigninDto extends SigninDto_base {
}
declare const SignupDto_base: import("nestjs-zod").ZodDto<{
    email: string;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
}, import("zod").ZodObjectDef<{
    password: import("zod").ZodString;
} & {
    email: import("zod").ZodString;
    firstName: import("zod").ZodString;
    lastName: import("zod").ZodString;
    username: import("zod").ZodString;
}, "strip", import("zod").ZodTypeAny>, {
    email: string;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
}>;
export declare class SignupDto extends SignupDto_base {
}
declare const SignoutDto_base: import("nestjs-zod").ZodDto<{
    user_id: string;
}, import("zod").ZodObjectDef<{
    user_id: import("zod").ZodString;
}, "strip", import("zod").ZodTypeAny>, {
    user_id: string;
}>;
export declare class SignoutDto extends SignoutDto_base {
}
declare const GetUserDto_base: import("nestjs-zod").ZodDto<{
    user_id: string;
}, import("zod").ZodObjectDef<{
    user_id: import("zod").ZodString;
}, "strip", import("zod").ZodTypeAny>, {
    user_id: string;
}>;
export declare class GetUserDto extends GetUserDto_base {
}
declare const ForgotPasswordDto_base: import("nestjs-zod").ZodDto<{
    email: string;
}, import("zod").ZodObjectDef<Pick<{
    password: import("zod").ZodString;
} & {
    email: import("zod").ZodString;
    firstName: import("zod").ZodString;
    lastName: import("zod").ZodString;
    username: import("zod").ZodString;
}, "email">, "strip", import("zod").ZodTypeAny>, {
    email: string;
}>;
export declare class ForgotPasswordDto extends ForgotPasswordDto_base {
}
declare const ResetPasswordDto_base: import("nestjs-zod").ZodDto<{
    user_id: string;
    password_hash: string;
}, import("zod").ZodObjectDef<{
    user_id: import("zod").ZodString;
} & {
    password_hash: import("zod").ZodString;
}, "strip", import("zod").ZodTypeAny>, {
    user_id: string;
    password_hash: string;
}>;
export declare class ResetPasswordDto extends ResetPasswordDto_base {
}
declare const UpdateAccountInformationDto_base: import("nestjs-zod").ZodDto<{
    user_id: string;
    email?: string | undefined;
    username?: string | undefined;
    password?: string | undefined;
    firstName?: string | undefined;
    lastName?: string | undefined;
}, import("zod").ZodObjectDef<{
    user_id: import("zod").ZodString;
} & {
    password: import("zod").ZodOptional<import("zod").ZodString>;
    email: import("zod").ZodOptional<import("zod").ZodString>;
    firstName: import("zod").ZodOptional<import("zod").ZodString>;
    lastName: import("zod").ZodOptional<import("zod").ZodString>;
    username: import("zod").ZodOptional<import("zod").ZodString>;
}, "strip", import("zod").ZodTypeAny>, {
    user_id: string;
    email?: string | undefined;
    username?: string | undefined;
    password?: string | undefined;
    firstName?: string | undefined;
    lastName?: string | undefined;
}>;
export declare class UpdateAccountInformationDto extends UpdateAccountInformationDto_base {
}
declare const DeleteUserDto_base: import("nestjs-zod").ZodDto<{
    user_id: string;
}, import("zod").ZodObjectDef<{
    user_id: import("zod").ZodString;
}, "strip", import("zod").ZodTypeAny>, {
    user_id: string;
}>;
export declare class DeleteUserDto extends DeleteUserDto_base {
}
declare const VerifyCodeDto_base: import("nestjs-zod").ZodDto<{
    user_id: string;
    otp: string;
}, import("zod").ZodObjectDef<Omit<{
    user_id: import("zod").ZodString;
} & {
    password_hash: import("zod").ZodString;
}, "password_hash"> & {
    otp: import("zod").ZodString;
}, "strip", import("zod").ZodTypeAny>, {
    user_id: string;
    otp: string;
}>;
export declare class VerifyCodeDto extends VerifyCodeDto_base {
}
export {};
