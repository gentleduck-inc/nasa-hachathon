import { Inject, Injectable } from '@nestjs/common'
import { eq, sql } from 'drizzle-orm'
import type { NodePgDatabase } from 'drizzle-orm/node-postgres'
import { throwError } from '~/common/libs'
import { DrizzleAsyncProvider, schema } from '~/drizzle'
import { CreateWasteMaterialDto, UpdateWasteMaterialDto, WasteMessagesType } from './waste_materials.types'

@Injectable()
export class WasteMaterialsService {
  constructor(
    @Inject(DrizzleAsyncProvider)
    private db: NodePgDatabase<typeof schema>,
  ) {}

  async createWasteMaterial(data: CreateWasteMaterialDto) {
    try {
      const material = await this.db
        .insert(schema.wasteMaterials)
        .values(data as never)
        .returning()
      if (!material?.length) {
        throwError<WasteMessagesType>('WASTE_MATERIAL_CREATION_FAILED', 500)
        return
      }
      return material[0]
    } catch (error) {
      console.log(error)
      throwError<WasteMessagesType>('WASTE_MATERIAL_CREATION_FAILED', 500)
      return
    }
  }

  async getWasteMaterials() {
    try {
      return await this.db.query.wasteMaterials.findMany()
    } catch (error) {
      console.log(error)
      throwError<WasteMessagesType>('WASTE_MATERIAL_FETCH_FAILED', 500)
      return
    }
  }

  async getWasteMaterialById(id: string) {
    try {
      const material = await this.db.query.wasteMaterials.findFirst({
        where: eq(schema.wasteMaterials.id, id),
      })
      if (!material) {
        throwError<WasteMessagesType>('WASTE_MATERIAL_NOT_FOUND', 404)
        return
      }
      return material
    } catch (error) {
      console.log(error)
      throwError<WasteMessagesType>('WASTE_CATEGORY_FETCH_FAILED', 500)
      return
    }
  }

  async updateWasteMaterial(data: UpdateWasteMaterialDto & { id: string }) {
    try {
      const { id, ...updateData } = data
      const material = await this.db
        .update(schema.wasteMaterials)
        .set({
          ...updateData,
          updated_at: new Date(),
          version: sql`${schema.wasteMaterials.version} + 1`,
        } as never)
        .where(eq(schema.wasteMaterials.id, id))
        .returning()

      if (!material?.length) {
        throwError<WasteMessagesType>('WASTE_MATERIAL_UPDATE_FAILED', 500)
        return
      }
      return material[0]
    } catch (error) {
      console.log(error)
      throwError<WasteMessagesType>('WASTE_MATERIAL_UPDATE_FAILED', 500)
      return
    }
  }

  async deleteWasteMaterial(id: string) {
    try {
      const [material] = await this.db.delete(schema.wasteMaterials).where(eq(schema.wasteMaterials.id, id)).returning()
      if (!material) {
        throwError<'WASTE_DELETE_FAILED'>('WASTE_DELETE_FAILED', 500)
        return
      }
      return { id: material.id }
    } catch (error) {
      console.log(error)
      throwError<WasteMessagesType>('WASTE_MATERIAL_DELETE_FAILED', 500)
      return
    }
  }
}
