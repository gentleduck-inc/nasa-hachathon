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
    'WASTE_INVENTORY_CREATED_SUCCESS',
    'WASTE_INVENTORY_UPDATED_SUCCESS',
    'WASTE_INVENTORY_DELETED_SUCCESS',
    'WASTE_INVENTORY_RESTORED_SUCCESS',
    'WASTE_INVENTORY_FETCH_SUCCESS',
    'WASTE_CATEGORY_FETCH_SUCCESS',
    'WASTE_ANALYSIS_COMPLETED_SUCCESS',
    'WASTE_INVENTORY_CREATION_FAILED',
    'WASTE_INVENTORY_UPDATE_FAILED',
    'WASTE_INVENTORY_DELETE_FAILED',
    'WASTE_INVENTORY_RESTORE_FAILED',
    'WASTE_INVENTORY_FETCH_FAILED',
    'WASTE_CATEGORY_FETCH_FAILED',
    'WASTE_CATEGORY_INVALID',
    'WASTE_INVENTORY_NOT_FOUND',
    'WASTE_DUPLICATE_NAME',
    'WASTE_INVALID_COMPOSITION',
    'WASTE_ANALYSIS_FAILED'
], ZodMessages, true);
//# sourceMappingURL=waste_inventory.constants.js.map