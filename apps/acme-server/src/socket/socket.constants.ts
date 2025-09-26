export const SOCKET_NAMESPACE = '/ws'

export const SocketEvents = {
  RunQueued: 'run_queued',
  RunStarted: 'run_started',
  RunProgress: 'run_progress',
  RunCompleted: 'run_completed',
  RunFailed: 'run_failed',
  ModuleStatusChanged: 'module_status_changed',
  AlertCreated: 'alert_created',
} as const

export type SocketEventName = (typeof SocketEvents)[keyof typeof SocketEvents]
