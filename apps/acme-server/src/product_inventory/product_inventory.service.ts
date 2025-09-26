import { Inject, Injectable } from '@nestjs/common'
import { and, count, desc, eq } from 'drizzle-orm'
import type { NodePgDatabase } from 'drizzle-orm/node-postgres'
import { throwError } from '~/common/libs'
import { DrizzleAsyncProvider, schema } from '~/drizzle'

@Injectable()
export class ProductInventoryService {
  constructor(
    @Inject(DrizzleAsyncProvider)
    private readonly db: NodePgDatabase<typeof schema>,
  ) {}

  async list() {
    try {
      return await this.db.select().from(schema.productInventory).orderBy(desc(schema.productInventory.created_at))
    } catch (e) {
      console.log(e)
      throwError<'PRODUCT_FETCH_FAILED'>('PRODUCT_FETCH_FAILED', 500)
      return
    }
  }

  async getById(id: string) {
    try {
      const row = await this.db.query.productInventory.findFirst({ where: eq(schema.productInventory.id, id) })
      if (!row) {
        throwError<'PRODUCT_NOT_FOUND'>('PRODUCT_NOT_FOUND', 404)
        return
      }
      return row
    } catch (e) {
      console.log(e)
      throwError<'PRODUCT_FETCH_FAILED'>('PRODUCT_FETCH_FAILED', 500)
      return
    }
  }

  async create(data: {
    product_type: string
    quantity: number
    total_mass_kg: number
    unit_mass_kg?: number | null
    location: string
    properties?: Record<string, any>
    production_run_id?: string | null
    quality_score?: number
  }) {
    try {
      const [row] = await this.db
        .insert(schema.productInventory)
        .values({
          product_type: data.product_type as any,
          quantity: data.quantity,
          total_mass_kg: String(data.total_mass_kg),
          unit_mass_kg: data.unit_mass_kg != null ? String(data.unit_mass_kg) : null,
          location: data.location,
          properties: data.properties ?? {},
          production_run_id: data.production_run_id ?? null,
          quality_score: data.quality_score ?? 1,
          is_available: true,
        } as any)
        .returning()

      return row
    } catch (e) {
      console.log(e)
      throwError<'PRODUCT_CREATE_FAILED'>('PRODUCT_CREATE_FAILED', 500)
      return
    }
  }

  async reserve(id: string, quantity: number) {
    try {
      const current = await this.db.query.productInventory.findFirst({ where: eq(schema.productInventory.id, id) })
      if (!current) {
        throwError<'PRODUCT_NOT_FOUND'>('PRODUCT_NOT_FOUND', 404)
        return
      }
      const available = (current.quantity ?? 0) - (current.reserved_quantity ?? 0)
      if (quantity > available) {
        throwError<'PRODUCT_RESERVE_FAILED'>('PRODUCT_RESERVE_FAILED', 400)
        return
      }
      const [row] = await this.db
        .update(schema.productInventory)
        .set({ reserved_quantity: (current.reserved_quantity ?? 0) + quantity, is_available: true, updated_at: new Date() })
        .where(eq(schema.productInventory.id, id))
        .returning()
      return row
    } catch (e) {
      console.log(e)
      throwError<'PRODUCT_RESERVE_FAILED'>('PRODUCT_RESERVE_FAILED', 500)
      return
    }
  }

  async consume(id: string, quantity: number) {
    try {
      const current = await this.db.query.productInventory.findFirst({ where: eq(schema.productInventory.id, id) })
      if (!current) {
        throwError<'PRODUCT_NOT_FOUND'>('PRODUCT_NOT_FOUND', 404)
        return
      }
      const total = current.quantity ?? 0
      const reserved = current.reserved_quantity ?? 0
      if (quantity > reserved || quantity > total) {
        throwError<'PRODUCT_CONSUME_FAILED'>('PRODUCT_CONSUME_FAILED', 400)
        return
      }
      const newQty = total - quantity
      const newRes = Math.max(0, reserved - quantity)
      const [row] = await this.db
        .update(schema.productInventory)
        .set({ quantity: newQty, reserved_quantity: newRes, is_available: newQty > 0, updated_at: new Date() })
        .where(eq(schema.productInventory.id, id))
        .returning()
      return row
    } catch (e) {
      console.log(e)
      throwError<'PRODUCT_CONSUME_FAILED'>('PRODUCT_CONSUME_FAILED', 500)
      return
    }
  }
}
