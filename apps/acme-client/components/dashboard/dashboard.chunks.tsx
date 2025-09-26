'use client'

import React from 'react'

// Types are intentionally loose here to avoid tight coupling; shape comes from backend.

export function ActiveRunsCard({
  count,
  health,
  socketStatus,
}: {
  count: number
  health: string
  socketStatus: 'disconnected' | 'connected' | 'error'
}) {
  return (
    <div className="w-full rounded-2xl border p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-heading font-semibold text-xl">Active Runs</h2>
          <p className="text-muted-foreground text-sm">Currently running processes</p>
        </div>
        <div className="font-bold text-4xl">{count}</div>
      </div>
      <div className="mt-4 flex items-center gap-4 text-muted-foreground text-sm">
        <span>Health: {health}</span>
        <span>Socket: {socketStatus}</span>
      </div>
    </div>
  )
}

export function ModuleStatusGrid({ modules, isLoading }: { modules: any[]; isLoading: boolean }) {
  return (
    <div className="rounded-2xl border p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="font-heading font-semibold text-xl">Module Status</h2>
      </div>
      {isLoading ? (
        <div className="p-6 text-center text-muted-foreground text-sm">Loading modules...</div>
      ) : (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {(modules ?? []).map((m: any, idx: number) => (
            <div className="rounded-xl border p-4" key={m?.id ?? idx}>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">{m?.name ?? m?.id ?? 'Module'}</div>
                  <div className="text-muted-foreground text-xs">{m?.type ?? '—'}</div>
                </div>
                <span
                  className={
                    'rounded-full px-2 py-1 text-xs' +
                    (m?.status === 'active'
                      ? 'bg-emerald-100 text-emerald-700'
                      : m?.status === 'maintenance'
                        ? 'bg-amber-100 text-amber-700'
                        : 'bg-slate-100 text-slate-700')
                  }>
                  {m?.status ?? 'unknown'}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export function TodayStatsCards({
  processedCount,
  productsCreated,
}: {
  processedCount: number
  productsCreated: number
}) {
  return (
    <div className="grid w-full grid-cols-2 gap-4">
      <div className="rounded-2xl border p-4 shadow-sm">
        <div className="text-muted-foreground text-xs uppercase">Today's Waste Processed</div>
        <div className="mt-2 font-bold text-3xl">{processedCount}</div>
      </div>
      <div className="rounded-2xl border p-4 shadow-sm">
        <div className="text-muted-foreground text-xs uppercase">Products Created</div>
        <div className="mt-2 font-bold text-3xl">{productsCreated}</div>
      </div>
    </div>
  )
}

export function RecentAlertsList() {
  // Placeholder until backend exposes alerts; keep UX consistent.
  return (
    <div className="rounded-2xl border p-4 shadow-sm">
      <h3 className="font-heading font-semibold text-lg">Recent Alerts</h3>
      <div className="mt-3 space-y-2 text-muted-foreground text-sm">
        <div>No recent alerts.</div>
      </div>
    </div>
  )
}

export function RunningProcessesList({ runs, isLoading }: { runs: any[]; isLoading: boolean }) {
  return (
    <div className="rounded-2xl border p-4 shadow-sm">
      <h3 className="font-heading font-semibold text-lg">Running Processes</h3>
      {isLoading ? (
        <div className="p-6 text-center text-muted-foreground text-sm">Loading runs...</div>
      ) : (runs ?? []).length ? (
        <ul className="mt-3 space-y-3">
          {(runs ?? []).map((r: any, idx: number) => (
            <li className="rounded-xl border p-3" key={r?.id ?? idx}>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">{r?.name ?? r?.id ?? 'Run'}</div>
                  <div className="text-muted-foreground text-xs">{r?.status ?? 'running'}</div>
                </div>
                <div className="text-sm">{typeof r?.progress === 'number' ? `${r.progress}%` : '—'}</div>
              </div>
              {typeof r?.progress === 'number' ? (
                <div className="mt-2 h-2 w-full overflow-hidden rounded bg-slate-100">
                  <div className="h-full bg-emerald-500" style={{ width: `${r.progress}%` }} />
                </div>
              ) : null}
            </li>
          ))}
        </ul>
      ) : (
        <div className="p-6 text-center text-muted-foreground text-sm">No running processes.</div>
      )}
    </div>
  )
}
