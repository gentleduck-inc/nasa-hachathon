import { Inject, Injectable } from '@nestjs/common'
import { eq, sql } from 'drizzle-orm'
import type { NodePgDatabase } from 'drizzle-orm/node-postgres'
import { throwError } from '~/common/libs'
import { DrizzleAsyncProvider, schema } from '~/drizzle'
import { CreateWasteInventoryDto, UpdateWasteInventoryDto, WasteMessagesType } from './waste_inventory.types'

@Injectable()
export class WasteInventorysService {
  constructor(
    @Inject(DrizzleAsyncProvider)
    private db: NodePgDatabase<typeof schema>,
  ) {}

  async createWasteInventory(data: CreateWasteInventoryDto) {
    try {
      const Inventory = await this.db
        .insert(schema.wasteInventory)
        .values(data as never)
        .returning()
      if (!Inventory?.length) {
        throwError<WasteMessagesType>('WASTE_INVENTORY_CREATION_FAILED', 500)
        return
      }
      return Inventory[0]
    } catch (error) {
      console.log(error)
      throwError<WasteMessagesType>('WASTE_INVENTORY_CREATION_FAILED', 500)
      return
    }
  }

  async getWasteInventorys() {
    try {
      return await this.db.query.wasteInventory.findMany()
    } catch (error) {
      console.log(error)
      throwError<WasteMessagesType>('WASTE_INVENTORY_FETCH_FAILED', 500)
      return
    }
  }

  async getWasteInventoryById(id: string) {
    try {
      const Inventory = await this.db.query.wasteInventory.findFirst({
        where: eq(schema.wasteInventory.id, id),
      })
      if (!Inventory) {
        throwError<WasteMessagesType>('WASTE_INVENTORY_NOT_FOUND', 404)
        return
      }
      return Inventory
    } catch (error) {
      console.log(error)
      throwError<WasteMessagesType>('WASTE_CATEGORY_FETCH_FAILED', 500)
      return
    }
  }

  async updateWasteInventory(data: UpdateWasteInventoryDto & { id: string }) {
    try {
      const { id, ...updateData } = data
      const Inventory = await this.db
        .update(schema.wasteInventory)
        .set({
          ...updateData,
          updated_at: new Date(),
          version: sql`${schema.wasteInventory.version} + 1`,
        } as never)
        .where(eq(schema.wasteInventory.id, id))
        .returning()

      if (!Inventory?.length) {
        throwError<WasteMessagesType>('WASTE_INVENTORY_UPDATE_FAILED', 500)
        return
      }
      return Inventory[0]
    } catch (error) {
      console.log(error)
      throwError<WasteMessagesType>('WASTE_INVENTORY_UPDATE_FAILED', 500)
      return
    }
  }

  async deleteWasteInventory(id: string) {
    try {
      const [Inventory] = await this.db
        .delete(schema.wasteInventory)
        .where(eq(schema.wasteInventory.id, id))
        .returning()
      if (!Inventory) {
        throwError<WasteMessagesType>('WASTE_INVENTORY_DELETE_FAILED', 500)
        return
      }
      return { id: Inventory.id }
    } catch (error) {
      console.log(error)
      throwError<WasteMessagesType>('WASTE_INVENTORY_DELETE_FAILED', 500)
      return
    }
  }
}
