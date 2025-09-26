import { Inject, Injectable } from '@nestjs/common'
import { and, count, desc, eq, gte, lte, type SQL, sql } from 'drizzle-orm'
import type { NodePgDatabase } from 'drizzle-orm/node-postgres'
import { throwError } from '~/common/libs'
import { DrizzleAsyncProvider, schema } from '~/drizzle'
import { QueueService } from '~/queue/queue.service'
import { ProcessingRunsRepository } from './processing_runs.repository'
import type { ProcessingRunsMessagesType } from './processing_runs.types'

interface CreateRunInput {
  name: string
  recipe_id: string
  module_id?: string
  input_quantities: Record<string, number>
  estimated_outputs?: Record<string, number>
  idempotencyKey: string
}

interface RunFilters {
  status?: 'queued' | 'running' | 'paused' | 'completed' | 'failed'
  module_id?: string
  recipe_id?: string
  date_from?: string
  date_to?: string
  page?: number
  limit?: number
}

@Injectable()
export class ProcessingRunsService {
  constructor(
    @Inject(DrizzleAsyncProvider)
    private db: NodePgDatabase<typeof schema>,
    private readonly queue: QueueService,
    private readonly repo: ProcessingRunsRepository,
  ) {}

  async createRun(input: CreateRunInput) {
    try {
      if (!input.idempotencyKey) {
        throwError<ProcessingRunsMessagesType>('RUN_IDEMPOTENCY_KEY_REQUIRED', 400)
        return
      }

      // Basic validation: recipe exists; module if provided exists
      const recipe = await this.repo.findRecipeById(input.recipe_id)
      if (!recipe) {
        throwError<ProcessingRunsMessagesType>('RUN_CREATE_FAILED', 400)
        return
      }
      if (input.module_id) {
        const module = await this.repo.findModuleById(input.module_id)
        if (!module) {
          throwError<ProcessingRunsMessagesType>('RUN_CREATE_FAILED', 400)
          return
        }
      }

      // Optional: validate input availability in wasteInventory (lightweight)
      // We ensure keys exist but do not reserve/increment yet (TODO: reservation tx)
      const inputKeys = Object.keys(input.input_quantities || {})
      if (!inputKeys.length) {
        throwError<ProcessingRunsMessagesType>('RUN_CREATE_FAILED', 400)
        return
      }

      const [{ total }] = await this.db
        .select({ total: count() })
        .from(schema.processingRuns)
        .where(eq(schema.processingRuns.name, input.name))
      if (total > 0) {
        // naive idempotency by name+key; in production store a dedicated idempotency table
      }

      // Reserve inventory transactionally
      try {
        await this.repo.reserveInventory(input.input_quantities)
      } catch (e) {
        console.log('Inventory reservation failed', e)
        throwError<ProcessingRunsMessagesType>('RUN_CREATE_FAILED', 400)
        return
      }

      const row = await this.repo.insertRun({
        created_at: new Date(),
        estimated_outputs: input.estimated_outputs ?? {},
        input_quantities: input.input_quantities,
        module_id: input.module_id ?? null,
        name: input.name,
        progress_percent: 0,
        recipe_id: input.recipe_id,
        status: 'queued',
      })

      if (!row) {
        throwError<ProcessingRunsMessagesType>('RUN_CREATE_FAILED', 500)
        return
      }
      // enqueue job for processing
      try {
        await this.queue.addProcessRun(
          {
            input: row.input_quantities as any,
            moduleId: row.module_id || undefined,
            recipeId: row.recipe_id,
            runId: row.id,
          },
          { attempts: 3, backoff: { delay: 5000, type: 'exponential' }, jobId: row.id },
        )
      } catch (e) {
        // do not fail the API if queueing fails; logs are sufficient
        console.log('Queue enqueue failed', e)
      }
      return row
    } catch (error) {
      console.log(error)
      throwError<ProcessingRunsMessagesType>('RUN_CREATE_FAILED', 500)
      return
    }
  }

  async listRuns(filters: RunFilters) {
    try {
      const page = filters.page ?? 1
      const limit = filters.limit ?? 20
      const offset = (page - 1) * limit
      const where = this.buildFilters(filters)

      const [{ total }] = await this.db.select({ total: count() }).from(schema.processingRuns).where(where)

      const items = await this.db
        .select()
        .from(schema.processingRuns)
        .where(where)
        .orderBy(desc(schema.processingRuns.created_at))
        .limit(limit)
        .offset(offset)

      const total_pages = Math.ceil(total / limit)
      return {
        items,
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
      throwError<ProcessingRunsMessagesType>('RUN_LIST_FETCH_FAILED', 500)
      return
    }
  }

  async getRunById(id: string) {
    try {
      const run = await this.db.query.processingRuns.findFirst({ where: eq(schema.processingRuns.id, id) })
      if (!run) {
        throwError<ProcessingRunsMessagesType>('RUN_NOT_FOUND', 404)
        return
      }
      // No steps/logs tables yet; return base run and placeholders
      return { ...run, logs: [] as any[], steps: [] }
    } catch (error) {
      console.log(error)
      throwError<ProcessingRunsMessagesType>('RUN_FETCH_FAILED', 500)
      return
    }
  }

  async cancelRun(id: string) {
    try {
      const current = await this.db.query.processingRuns.findFirst({ where: eq(schema.processingRuns.id, id) })
      if (!current) {
        throwError<ProcessingRunsMessagesType>('RUN_NOT_FOUND', 404)
        return
      }
      if (!['queued', 'running'].includes(current.status as string)) {
        throwError<ProcessingRunsMessagesType>('RUN_INVALID_STATUS', 400)
        return
      }

      const [row] = await this.db
        .update(schema.processingRuns)
        .set({
          completed_at: new Date(),
          error_message: 'Run cancelled by operator',
          status: 'failed',
          updated_at: new Date(),
        } as never)
        .where(eq(schema.processingRuns.id, id))
        .returning()

      return row
    } catch (error) {
      console.log(error)
      throwError<ProcessingRunsMessagesType>('RUN_CANCEL_FAILED', 500)
      return
    }
  }

  async retryRun(id: string) {
    try {
      const current = await this.db.query.processingRuns.findFirst({ where: eq(schema.processingRuns.id, id) })
      if (!current) {
        throwError<ProcessingRunsMessagesType>('RUN_NOT_FOUND', 404)
        return
      }
      if (current.status !== 'failed') {
        throwError<ProcessingRunsMessagesType>('RUN_INVALID_STATUS', 400)
        return
      }

      const [row] = await this.db
        .update(schema.processingRuns)
        .set({
          completed_at: null as any,
          error_message: null as any,
          progress_percent: 0,
          started_at: null as any,
          status: 'queued',
          updated_at: new Date(),
        } as never)
        .where(eq(schema.processingRuns.id, id))
        .returning()

      return row
    } catch (error) {
      console.log(error)
      throwError<ProcessingRunsMessagesType>('RUN_RETRY_FAILED', 500)
      return
    }
  }

  async getLogs(id: string) {
    try {
      // Placeholder until logs table exists
      const exists = await this.db.query.processingRuns.findFirst({ where: eq(schema.processingRuns.id, id) })
      if (!exists) {
        throwError<ProcessingRunsMessagesType>('RUN_NOT_FOUND', 404)
        return
      }
      return [] as any[]
    } catch (error) {
      console.log(error)
      throwError<ProcessingRunsMessagesType>('RUN_LOGS_FETCH_FAILED', 500)
      return
    }
  }

  private buildFilters(filters: RunFilters): SQL {
    const parts: SQL[] = []
    if (filters.status) parts.push(eq(schema.processingRuns.status, filters.status as any))
    if (filters.module_id) parts.push(eq(schema.processingRuns.module_id, filters.module_id))
    if (filters.recipe_id) parts.push(eq(schema.processingRuns.recipe_id, filters.recipe_id))
    if (filters.date_from) parts.push(gte(schema.processingRuns.created_at, new Date(filters.date_from)))
    if (filters.date_to) parts.push(lte(schema.processingRuns.created_at, new Date(filters.date_to)))

    let condition: SQL<any> = sql`1=1`
    for (const p of parts) {
      condition = and(condition, p) as any
    }
    return condition
  }
}
