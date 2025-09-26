import { schema } from '@acme/acme-db'
import { and, asc, desc, eq, sql } from 'drizzle-orm'
import { drizzle, type NodePgDatabase } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'

export interface RunJobData {
  runId: string
}

export class RunHandler {
  private db!: NodePgDatabase<typeof schema>

  constructor(private readonly databaseUrl: string) {}

  async init() {
    const pool = new Pool({ connectionString: this.databaseUrl })
    this.db = drizzle(pool, { casing: 'snake_case', schema }) as NodePgDatabase<typeof schema>
  }

  async process(job: RunJobData) {
    await this.markRunning(job.runId)

    // Simulate processing with progress updates
    for (const p of [5, 15, 30, 50, 75, 90, 100]) {
      await this.updateProgress(job.runId, p)
      await new Promise((r) => setTimeout(r, 200))
    }

    await this.complete(job.runId)
    return { ok: true }
  }

  private async markRunning(runId: string) {
    await this.db
      .update(schema.processingRuns)
      .set({ started_at: new Date(), status: 'running', updated_at: new Date() } as any)
      .where(eq(schema.processingRuns.id, runId))
  }

  private async updateProgress(runId: string, progress: number) {
    await this.db
      .update(schema.processingRuns)
      .set({ progress_percent: progress, updated_at: new Date() } as any)
      .where(eq(schema.processingRuns.id, runId))
  }

  private async complete(runId: string) {
    // Optionally create outputs into product_inventory based on estimated_outputs
    const run = await this.db.query.processingRuns.findFirst({ where: eq(schema.processingRuns.id, runId) })
    if (run?.estimated_outputs) {
      const outputs = run.estimated_outputs as Record<string, number>
      for (const [product_type, qty] of Object.entries(outputs)) {
        await this.db.insert(schema.productInventory).values({
          is_available: true,
          location: 'storage:default',
          product_type: product_type as any,
          production_run_id: runId,
          properties: {},
          quality_score: 1,
          quantity: Math.round(qty),
          total_mass_kg: String(qty),
          unit_mass_kg: null,
        } as any)
      }
    }

    await this.db
      .update(schema.processingRuns)
      .set({ completed_at: new Date(), status: 'completed', updated_at: new Date() } as any)
      .where(eq(schema.processingRuns.id, runId))
  }
}
