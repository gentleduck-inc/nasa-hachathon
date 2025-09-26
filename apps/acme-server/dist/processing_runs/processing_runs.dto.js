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
import { z } from 'zod';
var errorMessage = function (message) { return ({ message: message }); };
export var createRunSchema = z.object({
    estimated_outputs: z.record(z.number(__assign({}, errorMessage('ZOD_EXPECTED_NUMBER')))).optional(),
    input_quantities: z
        .record(z.number(__assign({}, errorMessage('ZOD_EXPECTED_NUMBER'))))
        .refine(function (o) { return Object.keys(o || {}).length > 0; }, errorMessage('ZOD_TOO_SMALL')),
    module_id: z
        .string(__assign({}, errorMessage('ZOD_EXPECTED_STRING')))
        .uuid(errorMessage('ZOD_INVALID_UUID'))
        .optional(),
    name: z.string(__assign({}, errorMessage('ZOD_EXPECTED_STRING'))).min(1, errorMessage('ZOD_TOO_SHORT')),
    recipe_id: z.string(__assign({}, errorMessage('ZOD_EXPECTED_STRING'))).uuid(errorMessage('ZOD_INVALID_UUID')),
});
export var runFiltersSchema = z.object({
    date_from: z
        .string(__assign({}, errorMessage('ZOD_EXPECTED_STRING')))
        .datetime(__assign({}, errorMessage('ZOD_INVALID_DATETIME')))
        .optional(),
    date_to: z
        .string(__assign({}, errorMessage('ZOD_EXPECTED_STRING')))
        .datetime(__assign({}, errorMessage('ZOD_INVALID_DATETIME')))
        .optional(),
    limit: z
        .number(__assign({}, errorMessage('ZOD_EXPECTED_NUMBER')))
        .min(1, __assign({}, errorMessage('ZOD_TOO_SMALL')))
        .max(100, __assign({}, errorMessage('ZOD_TOO_LONG')))
        .default(20),
    module_id: z
        .string(__assign({}, errorMessage('ZOD_EXPECTED_STRING')))
        .uuid(__assign({}, errorMessage('ZOD_INVALID_UUID')))
        .optional(),
    page: z
        .number(__assign({}, errorMessage('ZOD_EXPECTED_NUMBER')))
        .min(1, __assign({}, errorMessage('ZOD_TOO_SMALL')))
        .default(1),
    recipe_id: z
        .string(__assign({}, errorMessage('ZOD_EXPECTED_STRING')))
        .uuid(__assign({}, errorMessage('ZOD_INVALID_UUID')))
        .optional(),
    status: z.enum(['queued', 'running', 'paused', 'completed', 'failed']).optional(),
});
//# sourceMappingURL=processing_runs.dto.js.map