import React from 'react'
import { io, type Socket } from 'socket.io-client'

let socket: Socket | null = null

/**
 * Get or create a socket.io client instance.
 * This is a singleton to avoid multiple connections.
 */
export function getSocket() {
  if (typeof window === 'undefined') return null // Skip on server
  if (socket?.connected) return socket

  // Get the API URL without the /v1 prefix since WebSocket doesn't use it
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'
  const url = new URL(apiUrl)

  // Create socket connection with proper configuration
  const socketIoPath = `${url.pathname === '/' ? '' : url.pathname}/`

  socket = io(url.origin, {
    autoConnect: true,
    path: '/socket.io', // or '/ws' if you configured it in the gateway
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
    timeout: 20000,
    transports: ['websocket', 'polling'],
    withCredentials: true,
  })

  console.log(`Connecting to WebSocket at ${url.origin}${socketIoPath}`)

  // Debug logging
  socket.on('connect', () => {
    console.log('WebSocket connected', socket?.id)
  })

  socket.on('disconnect', (reason) => {
    console.log('WebSocket disconnected:', reason)
  })

  socket.on('connect_error', (err) => {
    console.error('WebSocket connection error:', err.message)
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
