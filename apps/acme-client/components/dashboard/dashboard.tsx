'use client'

import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect, useMemo, useState } from 'react'
import { server_api } from '~/libs/axios'
import {
  ActiveRunsCard,
  ModuleStatusGrid,
  RecentAlertsList,
  RunningProcessesList,
  TodayStatsCards,
} from './dashboard.chunks'

/**
 * Dashboard main component
 * Follows the pattern used in `components/waste-materials`:
 * - client component
 * - data fetched with react-query using the shared axios client `server_api`
 * - presentational subcomponents live in a sibling `*.chunks.tsx`
 */
export function Dashboard() {
  // Queries
  const runsQuery = useQuery({
    queryFn: async () => {
      const { data } = await server_api.get('/runs', { params: { status: 'running' } })
      return data?.data ?? []
    },
    queryKey: ['runs', { status: 'running' }],
    refetchInterval: 10_000,
  })

  const modulesQuery = useQuery({
    queryFn: async () => {
      const { data } = await server_api.get('/modules')
      return data?.data ?? []
    },
    queryKey: ['modules'],
    refetchInterval: 15_000,
  })

  const healthQuery = useQuery({
    queryFn: async () => {
      // NOTE: server has global prefix v1, so this becomes /v1/health.
      // If the endpoint is not available it will fail silently in UI.
      const { data } = await server_api.get('/health')
      return data ?? { status: 'unknown' }
    },
    queryKey: ['health'],
    refetchInterval: 30_000,
    retry: 0,
  })

  // Socket connection state
  const [socketStatus, setSocketStatus] = useState<'disconnected' | 'connected' | 'error'>('disconnected')
  const queryClient = useQueryClient()

  // Use our socket client with proper cleanup
  useEffect(() => {
    const initializeSocket = async () => {
      try {
        const { getSocket } = await import('~/libs/socket')
        const socket = getSocket()
        if (!socket) return

        const onConnect = () => setSocketStatus('connected')
        const onDisconnect = () => setSocketStatus('disconnected')
        const onError = () => setSocketStatus('error')

        // Listen for connection events
        socket.on('connect', onConnect)
        socket.on('disconnect', onDisconnect)
        socket.on('connect_error', onError)

        // Listen for run updates
        const onRunProgress = (data: any) => {
          queryClient.setQueryData(['runs', { status: 'running' }], (old: any) =>
            Array.isArray(old) ? old.map((run) => (run.id === data.id ? { ...run, ...data } : run)) : old,
          )
        }

        socket.on('run_progress', onRunProgress)

        // Set initial status
        setSocketStatus(socket.connected ? 'connected' : 'disconnected')

        // Cleanup
        return () => {
          socket.off('connect', onConnect)
          socket.off('disconnect', onDisconnect)
          socket.off('connect_error', onError)
          socket.off('run_progress', onRunProgress)
        }
      } catch (error) {
        console.error('Failed to initialize socket:', error)
        setSocketStatus('error')
      }
    }

    initializeSocket()
  }, [queryClient])

  const activeRuns = runsQuery.data ?? []
  const modules = modulesQuery.data ?? []
  const health = healthQuery.data ?? { status: 'unknown' }

  // Derived simple stats for today (placeholders if backend metrics not present)
  const todayStats = useMemo(() => {
    const processedCount = activeRuns.length // substitute with completed today when available
    const productsCreated = 0 // TODO: hook to product inventory delta
    return { processedCount, productsCreated }
  }, [activeRuns.length])

  return (
    <div className="flex-1 space-y-6 p-4 xl:px-8">
      <div className="flex items-start justify-between gap-4">
        <ActiveRunsCard count={activeRuns.length} health={health?.status ?? 'unknown'} socketStatus={socketStatus} />
        <TodayStatsCards processedCount={todayStats.processedCount} productsCreated={todayStats.productsCreated} />
      </div>

      <ModuleStatusGrid isLoading={modulesQuery.isLoading} modules={modules} />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <RunningProcessesList isLoading={runsQuery.isLoading} runs={activeRuns} />
        <RecentAlertsList />
      </div>
    </div>
  )
}
