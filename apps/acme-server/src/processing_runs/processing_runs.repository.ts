import { Inject, Injectable } from '@nestjs/common'
import { and, asc, count, desc, eq, gte, lte, sql } from 'drizzle-orm'
import type { NodePgDatabase } from 'drizzle-orm/node-postgres'
import { DrizzleAsyncProvider, schema } from '~/drizzle'

@Injectable()
export class ProcessingRunsRepository {
  constructor(
    @Inject(DrizzleAsyncProvider)
    private readonly db: NodePgDatabase<typeof schema>,
  ) {}

  async findRecipeById(id: string) {
    return this.db.query.processingRecipes.findFirst({ where: eq(schema.processingRecipes.id, id) })
  }

  async findModuleById(id: string) {
    return this.db.query.processingModules.findFirst({ where: eq(schema.processingModules.id, id) })
  }

  async sumAvailableForType(wasteType: string) {
    const rows = await this.db
      .select({ qty: schema.wasteInventory.quantity_kg })
      .from(schema.wasteInventory)
      .where(eq(schema.wasteInventory.waste_type, wasteType as any))
    return rows.reduce((acc, r) => acc + Number(r.qty), 0)
  }

  // Reserve materials transactionally using FEFO (expiry soonest first), then oldest collection date
  async reserveInventory(input: Record<string, number>) {
    return this.db.transaction(async (tx) => {
      for (const [wasteType, needed] of Object.entries(input)) {
        let remaining = Number(needed)
        if (remaining <= 0) continue

        // Fetch candidate rows ordered by earliest expiry then oldest collected
        const rows = await tx
          .select({ id: schema.wasteInventory.id, qty: schema.wasteInventory.quantity_kg })
          .from(schema.wasteInventory)
          .where(eq(schema.wasteInventory.waste_type, wasteType as any))
          .orderBy(asc(schema.wasteInventory.expiry_date), asc(schema.wasteInventory.date_collected))

        let total = rows.reduce((a, r) => a + Number(r.qty), 0)
        if (total + 1e-9 < remaining) {
          throw new Error(`INSUFFICIENT_${wasteType.toUpperCase()}`)
        }

        for (const r of rows) {
          if (remaining <= 1e-9) break
          const available = Number(r.qty)
          const take = Math.min(available, remaining)
          const newQty = Math.max(0, available - take)
          remaining = Number((remaining - take).toFixed(3))

          await tx
            .update(schema.wasteInventory)
            .set({ quantity_kg: String(newQty), updated_at: new Date() } as any)
            .where(eq(schema.wasteInventory.id, r.id))
        }
      }
    })
  }

  async insertRun(values: any) {
    const [row] = await this.db
      .insert(schema.processingRuns)
      .values(values as any)
      .returning()
    return row
  }

  async findRunById(id: string) {
    return this.db.query.processingRuns.findFirst({ where: eq(schema.processingRuns.id, id) })
  }

  async listRuns(where: any, limit: number, offset: number) {
    return this.db
      .select()
      .from(schema.processingRuns)
      .where(where)
      .orderBy(desc(schema.processingRuns.created_at))
      .limit(limit)
      .offset(offset)
  }

  async countRuns(where: any) {
    const [{ total }] = await this.db.select({ total: count() }).from(schema.processingRuns).where(where)
    return total
  }
}
