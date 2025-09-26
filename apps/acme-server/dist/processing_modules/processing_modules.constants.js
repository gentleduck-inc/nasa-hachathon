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
export var ProcessingModulesMessages = __spreadArray([
    'MODULE_CREATED_SUCCESS',
    'MODULE_FETCH_SUCCESS',
    'MODULE_LIST_FETCH_SUCCESS',
    'MODULE_UPDATED_SUCCESS',
    'MODULE_RESERVED_SUCCESS',
    'MODULE_RELEASED_SUCCESS',
    'MODULE_MAINTENANCE_SET_SUCCESS',
    'MODULE_CREATE_FAILED',
    'MODULE_FETCH_FAILED',
    'MODULE_LIST_FETCH_FAILED',
    'MODULE_UPDATE_FAILED',
    'MODULE_NOT_FOUND',
    'MODULE_RESERVE_FAILED',
    'MODULE_RELEASE_FAILED',
    'MODULE_MAINTENANCE_SET_FAILED',
    'MODULE_INVALID_STATUS'
], ZodMessages, true);
//# sourceMappingURL=processing_modules.constants.js.map