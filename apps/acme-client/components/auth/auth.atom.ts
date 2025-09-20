'use client'
import type { User } from '@acme/db/types'
import { atom } from 'jotai'
export const userAtom = atom<Omit<User, 'password'>>(
  (JSON.parse(localStorage?.getItem('user') as string) || null) as Omit<User, 'password'>,
)
