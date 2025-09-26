import { io, type Socket } from 'socket.io-client'

let socket: Socket | null = null

/**
 * Get or create a socket.io client instance.
 * This is a singleton to avoid multiple connections.
 */
export function getSocket() {
  if (typeof window === 'undefined') return null // Skip on server
  if (socket?.connected) return socket

  // Connect to the server's WebSocket endpoint (adjust if different)
  socket = io(process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000', {
    autoConnect: true,
    path: '/ws',
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
    withCredentials: true,
  })

  return socket
}

/**
 * Helper to subscribe to a socket event with cleanup.
 * Use in a useEffect for automatic cleanup.
 */
export function useSocketEvent<T = any>(event: string, handler: (data: T) => void, deps: React.DependencyList = []) {
  React.useEffect(() => {
    const s = getSocket()
    if (!s) return

    s.on(event, handler)
    return () => {
      s.off(event, handler)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps]) // Re-subscribe if deps change
}
