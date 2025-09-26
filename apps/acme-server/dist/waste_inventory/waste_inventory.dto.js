var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { WASTE_ENUM } from '@acme/acme-db/constants';
import { z } from 'zod';
var errorMessage = function (message) { return ({ message: message }); };
export var createWasteInventorySchema = z.object({
    category: z.enum(WASTE_ENUM, __assign({}, errorMessage('ZOD_EXPECTED_STRING'))),
    composition: z.record(z.any(__assign({}, errorMessage('ZOD_EXPECTED_OBJECT')))).optional(),
    density_kg_per_m3: z.number(__assign({}, errorMessage('ZOD_EXPECTED_NUMBER'))).optional(),
    description: z.string(__assign({}, errorMessage('ZOD_EXPECTED_STRING'))).optional(),
    name: z.string(__assign({}, errorMessage('ZOD_EXPECTED_STRING'))).max(100, __assign({}, errorMessage('ZOD_TOO_LONG'))),
    properties: z.record(z.any(__assign({}, errorMessage('ZOD_EXPECTED_OBJECT')))).optional(),
});
export var updateWasteInventorySchema = createWasteInventorySchema.partial();
//# sourceMappingURL=waste_inventory.dto.js.map