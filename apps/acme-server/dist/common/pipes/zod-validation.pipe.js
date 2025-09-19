"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ZodValidationPipe", {
    enumerable: true,
    get: function() {
        return ZodValidationPipe;
    }
});
const _libs = require("../libs");
let ZodValidationPipe = class ZodValidationPipe {
    transform(value, metadata) {
        try {
            return this.schema.parse(value);
        } catch (error) {
            const { errors } = error;
            console.log(error);
            (0, _libs.throwError)(`${errors[0].message}`);
        }
    }
    constructor(schema){
        this.schema = schema;
    }
};

//# sourceMappingURL=zod-validation.pipe.js.map