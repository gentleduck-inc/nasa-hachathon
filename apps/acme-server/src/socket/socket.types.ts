import session from 'express-session'

export type WSSession = {
  handshake: {
    session: session.Session & {
      user: {
        id: string
      }
    }
  }
}
