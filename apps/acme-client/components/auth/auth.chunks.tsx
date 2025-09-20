import { Input } from '@acme/ui/input'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@acme/ui/react-hook-form'
import type { UseMutationResult } from '@tanstack/react-query'
import { Eye, EyeOff } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import type { UseFormReturn } from 'react-hook-form'
import type { SigninSchemaType } from '~/server/auth/auth.dto'
import type { User } from '~/server/auth/schema/user.schema'
import type { ResponseType } from '~/server/common/types'
import type { SignupSchemaType } from './signup'

export function PasswordInput({
  form,
  mutation,
}: {
  form: UseFormReturn<SigninSchemaType | SignupSchemaType>
  mutation: UseMutationResult<ResponseType<Omit<User, 'password'>>, Error, any, unknown>
}) {
  const [showPassword, setShowPassword] = React.useState(false)

  return (
    <div className="flex items-center">
      <FormField
        control={form.control}
        name="password"
        render={({ field }) => (
          <FormItem className="flex-1">
            <FormControl>
              <div className="relative">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  {...field}
                  className="pr-10"
                  disabled={mutation.isPending}
                  placeholder="••••••••••••"
                />
                <button
                  className="-translate-y-1/2 absolute top-1/2 right-2 text-muted-foreground hover:text-foreground"
                  onClick={() => setShowPassword((prev) => !prev)}
                  tabIndex={-1}
                  type="button">
                  {showPassword ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
}

//   <div className="grid gap-2">
//             <div className="flex items-center justify-between">
//               <FormLabel>Password</FormLabel>
//               <Link href="/auth/forgot-password" className="text-sm underline-offset-4 hover:underline">
//                 Forgot your password?
//               </Link>
//             </div>
// ///
//
//   </div>
