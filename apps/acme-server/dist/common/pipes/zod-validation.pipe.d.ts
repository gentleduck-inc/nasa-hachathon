import type { ArgumentMetadata, PipeTransform } from '@nestjs/common';
import type { ZodSchema, z } from 'zod';
export declare class ZodValidationPipe implements PipeTransform {
    private schema;
    constructor(schema: ZodSchema);
    transform(value: unknown, metadata: ArgumentMetadata): z.infer<typeof this.schema>;
}
