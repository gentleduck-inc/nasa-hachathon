import { z } from 'zod';
export declare const signinSchema: z.ZodObject<{
    password: z.ZodString;
    username: z.ZodString;
}, "strip", z.ZodTypeAny, {
    username: string;
    password: string;
}, {
    username: string;
    password: string;
}>;
export type SignupSchemaType = z.infer<typeof signupSchema>;
export declare const signupSchema: z.ZodObject<{
    password: z.ZodString;
} & {
    email: z.ZodString;
    firstName: z.ZodString;
    lastName: z.ZodString;
    username: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
}, {
    email: string;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
}>;
export type SigninSchemaType = z.infer<typeof signinSchema>;
export declare const withIDSchema: z.ZodObject<{
    user_id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    user_id: string;
}, {
    user_id: string;
}>;
export type WithIDSchemaType = z.infer<typeof withIDSchema>;
export declare const forgotPasswordSchema: z.ZodObject<Pick<{
    password: z.ZodString;
} & {
    email: z.ZodString;
    firstName: z.ZodString;
    lastName: z.ZodString;
    username: z.ZodString;
}, "email">, "strip", z.ZodTypeAny, {
    email: string;
}, {
    email: string;
}>;
export type forgotPasswordSchemaType = z.infer<typeof forgotPasswordSchema>;
export declare const resetPasswordSchema: z.ZodObject<{
    user_id: z.ZodString;
} & {
    password_hash: z.ZodString;
}, "strip", z.ZodTypeAny, {
    user_id: string;
    password_hash: string;
}, {
    user_id: string;
    password_hash: string;
}>;
export type ResetPasswordSchemaType = z.infer<typeof resetPasswordSchema>;
export declare const updateAccountInformationSchema: z.ZodObject<{
    user_id: z.ZodString;
} & {
    password: z.ZodOptional<z.ZodString>;
    email: z.ZodOptional<z.ZodString>;
    firstName: z.ZodOptional<z.ZodString>;
    lastName: z.ZodOptional<z.ZodString>;
    username: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    user_id: string;
    email?: string | undefined;
    username?: string | undefined;
    password?: string | undefined;
    firstName?: string | undefined;
    lastName?: string | undefined;
}, {
    user_id: string;
    email?: string | undefined;
    username?: string | undefined;
    password?: string | undefined;
    firstName?: string | undefined;
    lastName?: string | undefined;
}>;
export type UpdateAccountInformationSchemaType = z.infer<typeof updateAccountInformationSchema>;
export declare const verifyCodeSchema: z.ZodObject<Omit<{
    user_id: z.ZodString;
} & {
    password_hash: z.ZodString;
}, "password_hash"> & {
    otp: z.ZodString;
}, "strip", z.ZodTypeAny, {
    user_id: string;
    otp: string;
}, {
    user_id: string;
    otp: string;
}>;
export type VerifyCodeSchemaType = z.infer<typeof verifyCodeSchema>;
