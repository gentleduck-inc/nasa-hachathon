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
export var ResourceMonitoringMessages = __spreadArray([
    'RESOURCE_USAGE_CREATED_SUCCESS',
    'RESOURCE_USAGE_LIST_FETCH_SUCCESS',
    'RESOURCE_DAILY_SUMMARY_FETCH_SUCCESS',
    'RESOURCE_EFFICIENCY_FETCH_SUCCESS',
    'RESOURCE_FORECASTING_FETCH_SUCCESS',
    'RESOURCE_USAGE_CREATE_FAILED',
    'RESOURCE_USAGE_FETCH_FAILED',
    'RESOURCE_DAILY_SUMMARY_FAILED',
    'RESOURCE_EFFICIENCY_FAILED',
    'RESOURCE_FORECASTING_FAILED'
], ZodMessages, true);
//# sourceMappingURL=resource_monitoring.constants.js.map