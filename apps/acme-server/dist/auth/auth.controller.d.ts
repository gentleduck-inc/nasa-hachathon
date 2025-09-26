import type { Request, Response } from 'express';
import type { SessionData } from 'express-session';
import type { ResponseType } from '~/common/types';
import { EmailService } from '~/email';
import type { AuthMessages } from './auth.constants';
import { AuthService } from './auth.service';
import type { ForgotPasswordDto, GetUserDto, ResetPasswordDto, SigninDto, SignupDto, UpdateAccountInformationDto, VerifyCodeDto } from './auth.types';
export declare class AuthController {
    private readonly authService;
    private readonly emailService;
    constructor(authService: AuthService, emailService: EmailService);
    signin(body: SigninDto, session: SessionData): Promise<ResponseType<Awaited<ReturnType<typeof this.authService.signin>>, typeof AuthMessages>>;
    signup(body: SignupDto): Promise<ResponseType<Awaited<ReturnType<typeof this.authService.signup>> | Error>>;
    signout(req: Request, res: Response): Promise<ResponseType<Awaited<null>, typeof AuthMessages>>;
    me(req: Request, res: Response, session: SessionData): Promise<ResponseType<Awaited<ReturnType<typeof this.authService.getAccountInformation>>, typeof AuthMessages>>;
    forgotPassword(body: ForgotPasswordDto): Promise<ResponseType<Awaited<ReturnType<typeof this.authService.forgotPassword>>, typeof AuthMessages>>;
    resetPassword(body: ResetPasswordDto): Promise<ResponseType<Awaited<ReturnType<typeof this.authService.resetPassword>>, typeof AuthMessages>>;
    updateAccountInformation(body: UpdateAccountInformationDto): Promise<ResponseType<Awaited<ReturnType<typeof this.authService.updateAccountInformation>>, typeof AuthMessages>>;
    verifyEmail(body: VerifyCodeDto): Promise<{
        data: null | undefined;
        state: string;
    }>;
    deleteAccount(body: GetUserDto): Promise<ResponseType<Awaited<ReturnType<typeof this.authService.deleteAccount>>, typeof AuthMessages>>;
}
