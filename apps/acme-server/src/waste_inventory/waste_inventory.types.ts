import { createZodDto } from 'nestjs-zod'
import { WasteMessages } from './waste_inventory.constants'
import { createWasteInventorySchema, updateWasteInventorySchema } from './waste_inventory.dto'

export type WasteMessagesType = (typeof WasteMessages)[number]

// DTOS TYPES
// Why these are here?
// well this clear because when i import the schemas in the client `Ts` parse these files and
// compiles them and throws errors of missing packages
export class CreateWasteInventoryDto extends createZodDto(createWasteInventorySchema) {}
export class UpdateWasteInventoryDto extends createZodDto(updateWasteInventorySchema) {}
