import { Inject, Injectable } from '@nestjs/common'
import { eq } from 'drizzle-orm'
import type { NodePgDatabase } from 'drizzle-orm/node-postgres'
import { throwError } from '~/common/libs'
import { DrizzleAsyncProvider, schema } from '~/drizzle'
import type { CreateWasteMaterialDto, UpdateWasteMaterialDto } from './waste_materials.dto'
import { WasteMessagesType } from './waste_materials.types'

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
        throwError<WasteMessagesType>('WASTE_MATERIAL_CREATION_FAILED')
        return
      }
      return material[0]
    } catch (error) {
      console.log(error)
      throwError<WasteMessagesType>('WASTE_MATERIAL_CREATION_FAILED')
      return
    }
  }

  async getWasteMaterials() {
    try {
      return await this.db.query.wasteMaterials.findMany()
    } catch (error) {
      console.log(error)
      throwError<WasteMessagesType>('WASTE_MATERIAL_FETCH_FAILED')
      return
    }
  }

  async getWasteMaterialById(id: string) {
    try {
      const material = await this.db.query.wasteMaterials.findFirst({
        where: eq(schema.wasteMaterials.id, id),
      })
      if (!material) {
        throwError<WasteMessagesType>('WASTE_MATERIAL_NOT_FOUND')
        return
      }
      return material
    } catch (error) {
      console.log(error)
      throwError<WasteMessagesType>('WASTE_CATEGORY_FETCH_FAILED')
      return
    }
  }

  async updateWasteMaterial(data: UpdateWasteMaterialDto) {
    try {
      const { id, ...updateData } = data
      const material = await this.db
        .update(schema.wasteMaterials)
        .set({ ...updateData, updated_at: new Date() } as never)
        .where(eq(schema.wasteMaterials.id, id))
        .returning()

      if (!material?.length) {
        throwError<WasteMessagesType>('WASTE_MATERIAL_UPDATE_FAILED')
        return
      }
      return material[0]
    } catch (error) {
      console.log(error)
      throwError<WasteMessagesType>('WASTE_MATERIAL_UPDATE_FAILED')
      return
    }
  }

  async deleteWasteMaterial(id: string) {
    try {
      const material = await this.db.delete(schema.wasteMaterials).where(eq(schema.wasteMaterials.id, id)).returning()
      if (!material?.length) {
        throwError<'WASTE_DELETE_FAILED'>('WASTE_DELETE_FAILED')
        return
      }
      return null
    } catch (error) {
      console.log(error)
      throwError<WasteMessagesType>('WASTE_MATERIAL_DELETE_FAILED')
      return
    }
  }
}
