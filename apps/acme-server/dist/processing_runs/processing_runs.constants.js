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
export var ProcessingRunsMessages = __spreadArray([
    'RUN_CREATED_SUCCESS',
    'RUN_FETCH_SUCCESS',
    'RUN_LIST_FETCH_SUCCESS',
    'RUN_CANCELLED_SUCCESS',
    'RUN_RETRY_SUCCESS',
    'RUN_LOGS_FETCH_SUCCESS',
    'RUN_CREATE_FAILED',
    'RUN_FETCH_FAILED',
    'RUN_LIST_FETCH_FAILED',
    'RUN_NOT_FOUND',
    'RUN_CANCEL_FAILED',
    'RUN_RETRY_FAILED',
    'RUN_LOGS_FETCH_FAILED',
    'RUN_INVALID_STATUS',
    'RUN_IDEMPOTENCY_KEY_REQUIRED'
], ZodMessages, true);
//# sourceMappingURL=processing_runs.constants.js.map