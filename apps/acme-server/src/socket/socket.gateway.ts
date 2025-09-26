import { Logger, UseGuards } from '@nestjs/common'
import { OnGatewayConnection, OnGatewayDisconnect, WebSocketGateway, WebSocketServer } from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'
import { AuthGuard } from '~/auth/auth.guard'
import { SOCKET_NAMESPACE, SocketEvents } from './socket.constants'

@WebSocketGateway({ cors: { credentials: true, origin: true }, namespace: SOCKET_NAMESPACE })
@UseGuards(AuthGuard)
export class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  public server!: Server

  private readonly logger = new Logger(SocketGateway.name)

  // In a full implementation, validate session via AuthService. We reuse AuthGuard above (session-based).
  async handleConnection(client: Socket) {
    try {
      // Optional: join rooms by query
      const runId = client.handshake.query.runId as string | undefined
      if (runId) client.join(this.runRoom(runId))

      const userId = (client.handshake.query.userId as string) || undefined
      if (userId) client.join(this.userRoom(userId))

      this.logger.log(`Client connected ${client.id}`)
    } catch (e) {
      this.logger.error('Socket connection rejected', e as any)
      client.disconnect(true)
    }
  }

  async handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected ${client.id}`)
  }

  // Rooms helpers
  runRoom(runId: string) {
    return `run:${runId}`
  }

  userRoom(userId: string) {
    return `user:${userId}`
  }

  // Emitters
  emitRunQueued(payload: { id: string; name: string }) {
    this.server.emit(SocketEvents.RunQueued, payload)
    this.server.to(this.runRoom(payload.id)).emit(SocketEvents.RunQueued, payload)
  }

  emitRunStarted(payload: { id: string; name: string; started_at?: string }) {
    this.server.emit(SocketEvents.RunStarted, payload)
    this.server.to(this.runRoom(payload.id)).emit(SocketEvents.RunStarted, payload)
  }

  emitRunProgress(payload: { id: string; progress_percent: number }) {
    this.server.emit(SocketEvents.RunProgress, payload)
    this.server.to(this.runRoom(payload.id)).emit(SocketEvents.RunProgress, payload)
  }

  emitRunCompleted(payload: { id: string; completed_at?: string }) {
    this.server.emit(SocketEvents.RunCompleted, payload)
    this.server.to(this.runRoom(payload.id)).emit(SocketEvents.RunCompleted, payload)
  }

  emitRunFailed(payload: { id: string; error_message?: string }) {
    this.server.emit(SocketEvents.RunFailed, payload)
    this.server.to(this.runRoom(payload.id)).emit(SocketEvents.RunFailed, payload)
  }

  emitModuleStatusChanged(payload: { id: string; status: string }) {
    this.server.emit(SocketEvents.ModuleStatusChanged, payload)
  }

  emitAlertCreated(payload: { id: string; severity: string; title: string }) {
    this.server.emit(SocketEvents.AlertCreated, payload)
  }
}
