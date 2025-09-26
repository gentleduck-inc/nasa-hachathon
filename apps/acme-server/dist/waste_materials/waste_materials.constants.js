var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { ZodMessages } from '~/common/constants';
export var WasteMessages = __spreadArray([
    'WASTE_MATERIAL_CREATED_SUCCESS',
    'WASTE_MATERIAL_UPDATED_SUCCESS',
    'WASTE_MATERIAL_DELETED_SUCCESS',
    'WASTE_MATERIAL_RESTORED_SUCCESS',
    'WASTE_MATERIAL_FETCH_SUCCESS',
    'WASTE_CATEGORY_FETCH_SUCCESS',
    'WASTE_ANALYSIS_COMPLETED_SUCCESS',
    'WASTE_MATERIAL_CREATION_FAILED',
    'WASTE_MATERIAL_UPDATE_FAILED',
    'WASTE_MATERIAL_DELETE_FAILED',
    'WASTE_MATERIAL_RESTORE_FAILED',
    'WASTE_MATERIAL_FETCH_FAILED',
    'WASTE_CATEGORY_FETCH_FAILED',
    'WASTE_CATEGORY_INVALID',
    'WASTE_MATERIAL_NOT_FOUND',
    'WASTE_DUPLICATE_NAME',
    'WASTE_INVALID_COMPOSITION',
    'WASTE_ANALYSIS_FAILED'
], ZodMessages, true);
//# sourceMappingURL=waste_materials.constants.js.map