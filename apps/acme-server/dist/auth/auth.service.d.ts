import type { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { schema } from '~/drizzle';
import type { UpdateAccountInformationSchemaType } from './auth.dto';
import type { DeleteUserDto, ForgotPasswordDto, GetUserDto, ResetPasswordDto, SigninDto, SignupDto, VerifyCodeDto } from './auth.types';
export declare class AuthService {
    private db;
    constructor(db: NodePgDatabase<typeof schema>);
    signin(data: SigninDto): Promise<{
        created_at: Date;
        email: string;
        first_name: string;
        id: string;
        is_active: boolean;
        last_name: string;
        role: "admin" | "operator" | "engineer" | "scientist";
        updated_at: Date;
        username: string;
    } | undefined>;
    signup(data: SignupDto): Promise<{
        created_at: Date;
        email: string;
        first_name: string;
        id: string;
        is_active: boolean;
        last_name: string;
        role: "admin" | "operator" | "engineer" | "scientist";
        updated_at: Date;
        username: string;
    } | undefined>;
    getAccountInformation(data: GetUserDto): Promise<{
        created_at: Date;
        email: string;
        first_name: string;
        id: string;
        is_active: boolean;
        last_name: string;
        role: "admin" | "operator" | "engineer" | "scientist";
        updated_at: Date;
        username: string;
    } | undefined>;
    forgotPassword(data: ForgotPasswordDto): Promise<{
        otp: any;
        user: {
            created_at: Date;
            email: string;
            first_name: string;
            id: string;
            is_active: boolean;
            last_name: string;
            role: "admin" | "operator" | "engineer" | "scientist";
            updated_at: Date;
            username: string;
        };
    } | undefined>;
    resetPassword(data: ResetPasswordDto): Promise<{
        created_at: Date;
        email: string;
        first_name: string;
        id: string;
        is_active: boolean;
        last_name: string;
        role: "admin" | "operator" | "engineer" | "scientist";
        updated_at: Date;
        username: string;
    }[] | undefined>;
    updateAccountInformation({ user_id, ...data }: UpdateAccountInformationSchemaType): Promise<{
        created_at: Date;
        email: string;
        first_name: string;
        id: string;
        is_active: boolean;
        last_name: string;
        role: "admin" | "operator" | "engineer" | "scientist";
        updated_at: Date;
        username: string;
    }[] | undefined>;
    verifyCode(data: VerifyCodeDto): Promise<null | undefined>;
    deleteAccount(data: DeleteUserDto): Promise<null | undefined>;
}
