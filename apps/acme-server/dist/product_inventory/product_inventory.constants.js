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
export var ProductInventoryMessages = __spreadArray([
    'PRODUCT_CREATED_SUCCESS',
    'PRODUCT_UPDATED_SUCCESS',
    'PRODUCT_RESERVED_SUCCESS',
    'PRODUCT_CONSUMED_SUCCESS',
    'PRODUCT_LIST_FETCH_SUCCESS',
    'PRODUCT_AVAILABILITY_FETCH_SUCCESS',
    'PRODUCT_DISTRIBUTION_FETCH_SUCCESS',
    'PRODUCT_CREATE_FAILED',
    'PRODUCT_UPDATE_FAILED',
    'PRODUCT_FETCH_FAILED',
    'PRODUCT_NOT_FOUND'
], ZodMessages, true);
//# sourceMappingURL=product_inventory.constants.js.map