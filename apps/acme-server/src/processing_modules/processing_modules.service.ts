import { randomUUID } from 'node:crypto'
import { Inject, Injectable } from '@nestjs/common'
import { and, asc, count, eq, type SQL, sql } from 'drizzle-orm'
import type { NodePgDatabase } from 'drizzle-orm/node-postgres'
import { throwError } from '~/common/libs'
import { DrizzleAsyncProvider, schema } from '~/drizzle'
import type { ProcessingModulesMessagesType } from './processing_modules.types'

interface ModuleFilters {
  type?: string
  status?: 'active' | 'maintenance' | 'broken' | 'offline'
  page?: number
  limit?: number
}

interface CreateModuleInput {
  name: string
  module_type: string
  throughput_kg_per_hour: number
  power_consumption_kw: number
  efficiency_rating?: number
  capabilities?: Record<string, any>
}

interface UpdateModuleInput {
  status?: 'active' | 'maintenance' | 'broken' | 'offline'
  throughput_kg_per_hour?: number
  power_consumption_kw?: number
  efficiency_rating?: number
  capabilities?: Record<string, any>
}

interface MaintenanceInput {
  maintenance_type: string
  description?: string
  scheduled_date?: string
  performed_by?: string
  parts_replaced?: string[]
  duration_hours?: number
}

@Injectable()
export class ProcessingModulesService {
  constructor(
    @Inject(DrizzleAsyncProvider)
    private db: NodePgDatabase<typeof schema>,
  ) {}

  async listModules(filters: ModuleFilters) {
    try {
      const page = filters.page ?? 1
      const limit = filters.limit ?? 20
      const offset = (page - 1) * limit

      const where = this.buildFilters(filters)

      const [{ total }] = await this.db.select({ total: count() }).from(schema.processingModules).where(where)

      const items = await this.db
        .select()
        .from(schema.processingModules)
        .where(where)
        .orderBy(asc(schema.processingModules.name))
        .limit(limit)
        .offset(offset)

      const total_pages = Math.ceil(total / limit)
      return {
        items: items.map((m) => this.format(m)),
        pagination: {
          has_next: page < total_pages,
          has_previous: page > 1,
          limit,
          page,
          total,
          total_pages,
        },
      }
    } catch (error) {
      console.log(error)
      throwError<ProcessingModulesMessagesType>('MODULE_LIST_FETCH_FAILED', 500)
      return
    }
  }

  async getModuleById(id: string) {
    try {
      const module = await this.db.query.processingModules.findFirst({ where: eq(schema.processingModules.id, id) })
      if (!module) {
        throwError<ProcessingModulesMessagesType>('MODULE_NOT_FOUND', 404)
        return
      }
      return this.format(module)
    } catch (error) {
      console.log(error)
      throwError<ProcessingModulesMessagesType>('MODULE_FETCH_FAILED', 500)
      return
    }
  }

  async createModule(input: CreateModuleInput) {
    try {
      const [row] = await this.db
        .insert(schema.processingModules)
        .values({
          capabilities: input.capabilities ?? {},
          efficiency_rating: input.efficiency_rating ?? 1,
          module_type: input.module_type,
          name: input.name,
          power_consumption_kw: String(input.power_consumption_kw),
          status: 'active',
          throughput_kg_per_hour: String(input.throughput_kg_per_hour),
        } as never)
        .returning()

      if (!row) {
        throwError<ProcessingModulesMessagesType>('MODULE_CREATE_FAILED', 500)
        return
      }
      return this.format(row)
    } catch (error) {
      console.log(error)
      throwError<ProcessingModulesMessagesType>('MODULE_CREATE_FAILED', 500)
      return
    }
  }

  async updateModule(id: string, input: UpdateModuleInput) {
    try {
      const current = await this.db.query.processingModules.findFirst({ where: eq(schema.processingModules.id, id) })
      if (!current) {
        throwError<ProcessingModulesMessagesType>('MODULE_NOT_FOUND', 404)
        return
      }
      const [row] = await this.db
        .update(schema.processingModules)
        .set({
          capabilities: input.capabilities ?? (current as any).capabilities,
          efficiency_rating: input.efficiency_rating ?? (current as any).efficiency_rating,
          power_consumption_kw:
            input.power_consumption_kw != null
              ? String(input.power_consumption_kw)
              : (current as any).power_consumption_kw,
          status: input.status ?? (current.status as any),
          throughput_kg_per_hour:
            input.throughput_kg_per_hour != null
              ? String(input.throughput_kg_per_hour)
              : (current as any).throughput_kg_per_hour,
          updated_at: new Date(),
        } as never)
        .where(eq(schema.processingModules.id, id))
        .returning()

      if (!row) {
        throwError<ProcessingModulesMessagesType>('MODULE_UPDATE_FAILED', 500)
        return
      }
      return this.format(row)
    } catch (error) {
      console.log(error)
      throwError<ProcessingModulesMessagesType>('MODULE_UPDATE_FAILED', 500)
      return
    }
  }

  async reserveModule(id: string) {
    try {
      const current = await this.db.query.processingModules.findFirst({ where: eq(schema.processingModules.id, id) })
      if (!current) {
        throwError<ProcessingModulesMessagesType>('MODULE_NOT_FOUND', 404)
        return
      }
      if (current.status !== 'active' || current.current_recipe_id) {
        throwError<ProcessingModulesMessagesType>('MODULE_RESERVE_FAILED', 400)
        return
      }
      const token = randomUUID()
      const newCaps = {
        ...(current.capabilities as any),
        reservation_token: token,
        reserved_at: new Date().toISOString(),
      }

      const [row] = await this.db
        .update(schema.processingModules)
        .set({ capabilities: newCaps, updated_at: new Date() } as never)
        .where(eq(schema.processingModules.id, id))
        .returning()

      if (!row) {
        throwError<ProcessingModulesMessagesType>('MODULE_RESERVE_FAILED', 500)
        return
      }
      return { module: this.format(row), token }
    } catch (error) {
      console.log(error)
      throwError<ProcessingModulesMessagesType>('MODULE_RESERVE_FAILED', 500)
      return
    }
  }

  async releaseModule(id: string) {
    try {
      const current = await this.db.query.processingModules.findFirst({ where: eq(schema.processingModules.id, id) })
      if (!current) {
        throwError<ProcessingModulesMessagesType>('MODULE_NOT_FOUND', 404)
        return
      }
      const caps = { ...(current.capabilities as any) }
      delete (caps as any).reservation_token
      delete (caps as any).reserved_at

      const [row] = await this.db
        .update(schema.processingModules)
        .set({ capabilities: caps, updated_at: new Date() } as never)
        .where(eq(schema.processingModules.id, id))
        .returning()

      if (!row) {
        throwError<ProcessingModulesMessagesType>('MODULE_RELEASE_FAILED', 500)
        return
      }
      return this.format(row)
    } catch (error) {
      console.log(error)
      throwError<ProcessingModulesMessagesType>('MODULE_RELEASE_FAILED', 500)
      return
    }
  }

  async setMaintenance(id: string, input: MaintenanceInput) {
    try {
      const current = await this.db.query.processingModules.findFirst({ where: eq(schema.processingModules.id, id) })
      if (!current) {
        throwError<ProcessingModulesMessagesType>('MODULE_NOT_FOUND', 404)
        return
      }

      // Update status to maintenance
      const [mod] = await this.db
        .update(schema.processingModules)
        .set({ status: 'maintenance', updated_at: new Date() } as never)
        .where(eq(schema.processingModules.id, id))
        .returning()

      // Optionally create maintenance record
      if (input.maintenance_type || input.description || input.scheduled_date) {
        await this.db
          .insert(schema.maintenanceRecords)
          .values({
            description: input.description || null,
            duration_hours: input.duration_hours != null ? String(input.duration_hours) : null,
            maintenance_type: input.maintenance_type || 'inspection',
            module_id: id,
            parts_replaced: input.parts_replaced || [],
            performed_by: input.performed_by || null,
            scheduled_date: input.scheduled_date ? new Date(input.scheduled_date) : null,
            status: 'scheduled',
          } as never)
          .returning()
      }

      return this.format(mod)
    } catch (error) {
      console.log(error)
      throwError<ProcessingModulesMessagesType>('MODULE_MAINTENANCE_SET_FAILED', 500)
      return
    }
  }

  private buildFilters(filters: ModuleFilters): SQL {
    const parts: SQL[] = [sql`1=1`]
    if (filters.type) parts.push(eq(schema.processingModules.module_type, filters.type))
    if (filters.status) parts.push(eq(schema.processingModules.status, filters.status as any))
    // Reduce left-to-right with AND
    let cond = parts[0]
    for (let i = 1; i < parts.length; i++) cond = and(cond, parts[i]) as any
    return cond
  }

  private format(row: any) {
    return {
      ...row,
      efficiency_rating: Number(row.efficiency_rating),
      is_available: row.status === 'active' && !row.current_recipe_id && !(row.capabilities as any)?.reservation_token,
      power_consumption_kw: Number(row.power_consumption_kw),
      throughput_kg_per_hour: Number(row.throughput_kg_per_hour),
    }
  }
}
