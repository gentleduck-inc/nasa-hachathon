export const SOCKET_NAMESPACE = '/ws'

export const SocketEvents = {
  AlertCreated: 'alert_created',
  ModuleStatusChanged: 'module_status_changed',
  RunCompleted: 'run_completed',
  RunFailed: 'run_failed',
  RunProgress: 'run_progress',
  RunQueued: 'run_queued',
  RunStarted: 'run_started',
} as const

export type SocketEventName = (typeof SocketEvents)[keyof typeof SocketEvents]
