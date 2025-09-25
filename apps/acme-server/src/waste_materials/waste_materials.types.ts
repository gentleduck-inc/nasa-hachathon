import { createZodDto } from 'nestjs-zod'
import { WasteMessages } from './waste_materials.constants'
import { createWasteMaterialSchema, updateWasteMaterialSchema } from './waste_materials.dto'

export type WasteMessagesType = (typeof WasteMessages)[number]

// DTOS TYPES
// Why these are here?
// well this clear because when i import the schemas in the client `Ts` parse these files and
// compiles them and throws errors of missing packages
export class CreateWasteMaterialDto extends createZodDto(createWasteMaterialSchema) {}
export class UpdateWasteMaterialDto extends createZodDto(updateWasteMaterialSchema) {}
