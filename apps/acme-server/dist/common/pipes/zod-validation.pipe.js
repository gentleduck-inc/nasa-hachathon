import { throwError } from '../libs';
var ZodValidationPipe = (function () {
    function ZodValidationPipe(schema) {
        this.schema = schema;
    }
    ZodValidationPipe.prototype.transform = function (value, metadata) {
        try {
            return this.schema.parse(value);
        }
        catch (error) {
            var errors = error.errors;
            console.log(error);
            throwError("".concat(errors[0].message));
        }
    };
    return ZodValidationPipe;
}());
export { ZodValidationPipe };
//# sourceMappingURL=zod-validation.pipe.js.map