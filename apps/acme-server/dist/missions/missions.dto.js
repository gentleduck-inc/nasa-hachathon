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
var baseMissionSchema = z.object({
    crew_size: z
        .number(__assign({}, errorMessage('ZOD_EXPECTED_NUMBER')))
        .min(1, __assign({}, errorMessage('ZOD_TOO_SHORT')))
        .max(50, __assign({}, errorMessage('ZOD_TOO_LONG')))
        .default(8),
    description: z.string(__assign({}, errorMessage('ZOD_EXPECTED_STRING'))).optional(),
    landing_date: z
        .string(__assign({}, errorMessage('ZOD_EXPECTED_STRING')))
        .datetime(__assign({}, errorMessage('ZOD_INVALID_DATE')))
        .optional(),
    landing_site: z
        .string(__assign({}, errorMessage('ZOD_EXPECTED_STRING')))
        .max(100, __assign({}, errorMessage('ZOD_TOO_LONG')))
        .default('Jezero Crater'),
    launch_date: z
        .string(__assign({}, errorMessage('ZOD_EXPECTED_STRING')))
        .datetime(__assign({}, errorMessage('ZOD_INVALID_DATE')))
        .optional(),
    mission_duration_days: z
        .number(__assign({}, errorMessage('ZOD_EXPECTED_NUMBER')))
        .min(1, __assign({}, errorMessage('ZOD_TOO_SHORT')))
        .default(1095),
    name: z
        .string(__assign({}, errorMessage('ZOD_EXPECTED_STRING')))
        .min(1, __assign({}, errorMessage('ZOD_TOO_SHORT')))
        .max(200, __assign({}, errorMessage('ZOD_TOO_LONG'))),
    return_date: z
        .string(__assign({}, errorMessage('ZOD_EXPECTED_STRING')))
        .datetime(__assign({}, errorMessage('ZOD_INVALID_DATE')))
        .optional(),
    settings: z.record(z.any(__assign({}, errorMessage('ZOD_EXPECTED_OBJECT')))).optional(),
    status: z
        .enum(['planning', 'active', 'completed', 'aborted'], __assign({}, errorMessage('ZOD_EXPECTED_STRING')))
        .default('planning'),
});
export var createMissionSchema = baseMissionSchema
    .refine(function (data) {
    if (data.launch_date && data.landing_date) {
        return new Date(data.launch_date) < new Date(data.landing_date);
    }
    return true;
}, __assign(__assign({}, errorMessage('MISSION_INVALID_DATES')), { path: ['landing_date'] }))
    .refine(function (data) {
    if (data.landing_date && data.return_date) {
        return new Date(data.landing_date) < new Date(data.return_date);
    }
    return true;
}, __assign(__assign({}, errorMessage('MISSION_INVALID_DATES')), { path: ['return_date'] }));
export var updateMissionSchema = baseMissionSchema.partial();
export var assignCrewSchema = z.object({
    role: z.enum(['admin', 'mission_commander', 'crew_member', 'engineer', 'scientist'], __assign({}, errorMessage('ZOD_EXPECTED_STRING'))),
    specialization: z
        .string(__assign({}, errorMessage('ZOD_EXPECTED_STRING')))
        .max(100, __assign({}, errorMessage('ZOD_TOO_LONG')))
        .optional(),
    user_id: z.string(__assign({}, errorMessage('ZOD_EXPECTED_STRING'))).uuid(__assign({}, errorMessage('ZOD_INVALID_UUID'))),
});
export var updateMissionStatusSchema = z.object({
    status: z.enum(['planning', 'active', 'completed', 'aborted'], __assign({}, errorMessage('ZOD_EXPECTED_STRING'))),
});
//# sourceMappingURL=missions.dto.js.map