import { Inject, Injectable } from '@nestjs/common'
import { type DrizzleError, eq } from 'drizzle-orm'
import type { NodePgDatabase } from 'drizzle-orm/node-postgres'
import otpGenerator from 'otp-generator'
import { PasswordHasher, throwError } from '~/common/libs'
import { DrizzleAsyncProvider, schema } from '~/drizzle'
import type { UpdateAccountInformationSchemaType } from './auth.dto'
import type {
  AuthMessageType,
  DeleteUserDto,
  ForgotPasswordDto,
  GetUserDto,
  ResetPasswordDto,
  SigninDto,
  SignupDto,
  VerifyCodeDto,
} from './auth.types'

@Injectable()
export class AuthService {
  constructor(
    @Inject(DrizzleAsyncProvider)
    private db: NodePgDatabase<typeof schema>,
    // @Inject(WINSTON_MODULE_NEST_PROVIDER)
    // private readonly logger: WinstonLogger,
  ) {}

  async signin(data: SigninDto) {
    try {
      const _user = await this.db.query.users.findFirst({
        where: eq(schema.users.username, data.username),
      })

      if (!_user) {
        throwError<AuthMessageType>('AUTH_USERNAME_INVALID')
        return
      }

      const passwordMatch = await PasswordHasher.comparePassword(data.password, _user.password_hash)
      if (!passwordMatch) {
        throwError<AuthMessageType>('AUTH_PASSWORD_INVALID')
        return
      }

      // omit password
      const { password_hash: _, ...user } = _user
      return user
    } catch (error) {
      console.log(error)
      throwError<AuthMessageType>('AUTH_SIGNIN_FAILED')
      return
    }
  }

  async getAccountInformation(data: GetUserDto) {
    try {
      const user = await this.db.query.users.findFirst({
        columns: {
          email: true,
          first_name: true,
          id: true,
          last_name: true,
        },
        where: eq(schema.users.id, data.user_id),
      })

      if (!user) {
        throwError<AuthMessageType>('AUTH_USER_NOT_FOUND_OR_UNAUTHORIZED')
        return
      }
      return user
    } catch (error) {
      console.log(error)
      throwError<AuthMessageType>('AUTH_GET_ACCOUNT_INFORMATION_FAILED')
      return
    }
  }

  async forgotPassword(data: ForgotPasswordDto) {
    try {
      const user = await this.db.query.users.findFirst({
        where: eq(schema.users.email, data.email),
      })

      if (!user) {
        throwError<AuthMessageType>('AUTH_USER_NOT_FOUND')
        return
      }

      const OTP = otpGenerator.generate(6, {
        lowerCaseAlphabets: true,
        specialChars: true,
        upperCaseAlphabets: true,
      })

      const expires_at = new Date(Date.now() + 60000 * 10)
      const otp = await this.db
        .insert(schema.otpCodes)
        .values({
          code: OTP,
          user_id: user?.id,
          ...data,
          expires_at,
        })
        .returning()

      if (!otp?.length) {
        throwError<AuthMessageType>('AUTH_FORGOT_PASSWORD_FAILED')
        return
      }
      return { otp, user }
    } catch (error) {
      console.log(error)
      throwError<AuthMessageType>('AUTH_FORGOT_PASSWORD_FAILED')
      return
    }
  }

  async resetPassword(data: ResetPasswordDto) {
    try {
      const password_hash = await PasswordHasher.hashPassword(data.password_hash)
      data.password_hash = password_hash
      console.log(data)

      const user = await this.db
        .update(schema.users)
        .set({ ...data })
        .where(eq(schema.users.id, data.user_id))
        .returning()

      console.log(user)

      if (!user?.length) {
        throwError<AuthMessageType>('AUTH_USER_NOT_FOUND_OR_RESET_PASSWORD_FAILED')
        return
      }
      return user
    } catch (error) {
      console.log(error)
      throwError<AuthMessageType>('AUTH_RESET_PASSWORD_FAILED')
      return
    }
  }

  async updateAccountInformation({ user_id, ...data }: UpdateAccountInformationSchemaType) {
    try {
      const user = await this.db
        .update(schema.users)
        .set({ ...data })
        .where(eq(schema.users.id, user_id))
        .returning()

      if (!user?.length) {
        throwError<AuthMessageType>('AUTH_USER_NOT_FOUND_OR_UPDATE_ACCOUNT_INFORMATION_FAILED')
        return
      }
      return user
    } catch (error) {
      console.log(error)
      throwError<AuthMessageType>('AUTH_UPDATE_ACCOUNT_INFORMATION_FAILED')
      return
    }
  }

  async verifyCode(data: VerifyCodeDto) {
    try {
      const otp = await this.db.delete(schema.otpCodes).where(eq(schema.otpCodes.user_id, data.user_id)).returning()
      console.log(otp)

      if (!otp?.length) {
        throwError<AuthMessageType>('AUTH_USER_NOT_FOUND_OR_VERIFY_CODE_FAILED')
        return
      }
      return null
    } catch (error) {
      console.log(error)
      throwError<AuthMessageType>('AUTH_VERIFY_CODE_FAILED')
      return
    }
  }

  async deleteAccount(data: DeleteUserDto) {
    try {
      const user = await this.db.delete(schema.users).where(eq(schema.users.id, data.user_id)).returning()
      if (!user?.length) {
        throwError<AuthMessageType>('AUTH_USER_NOT_FOUND_OR_DELETE_ACCOUNT_FAILED')
        return
      }
      return null
    } catch (error) {
      console.log(error)
      throwError<AuthMessageType>('AUTH_DELETE_ACCOUNT_FAILED')
      return
    }
  }
}
