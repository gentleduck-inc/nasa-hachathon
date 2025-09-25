import { WsException } from '@nestjs/websockets'

export function throwError<T extends string>(string: T, status: number): Error {
  throw new Error(string, {
    cause: status,
  })
}

export function throwWSError<T extends string>(string: T): Error {
  throw new WsException(string)
}
