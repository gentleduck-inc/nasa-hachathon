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
export var MissionsMessages = __spreadArray([
    'MISSION_CREATED_SUCCESS',
    'MISSION_UPDATED_SUCCESS',
    'MISSION_DELETED_SUCCESS',
    'MISSION_RESTORED_SUCCESS',
    'MISSION_FETCH_SUCCESS',
    'MISSION_STATUS_UPDATED_SUCCESS',
    'MISSION_CREW_ASSIGNED_SUCCESS',
    'MISSION_CREW_REMOVED_SUCCESS',
    'MISSION_TIMELINE_FETCH_SUCCESS',
    'MISSION_STATISTICS_FETCH_SUCCESS',
    'MISSION_WASTE_PROFILE_UPDATED_SUCCESS',
    'MISSION_CREATION_FAILED',
    'MISSION_UPDATE_FAILED',
    'MISSION_DELETE_FAILED',
    'MISSION_RESTORE_FAILED',
    'MISSION_FETCH_FAILED',
    'MISSION_STATUS_UPDATE_FAILED',
    'MISSION_NOT_FOUND',
    'MISSION_DUPLICATE_NAME',
    'MISSION_INVALID_STATUS',
    'MISSION_INVALID_DATES',
    'MISSION_CREW_ASSIGNMENT_FAILED',
    'MISSION_CREW_REMOVAL_FAILED',
    'MISSION_CREW_NOT_FOUND',
    'MISSION_CREW_ALREADY_ASSIGNED',
    'MISSION_INVALID_CREW_SIZE',
    'MISSION_TIMELINE_FETCH_FAILED',
    'MISSION_STATISTICS_FETCH_FAILED',
    'MISSION_WASTE_PROFILE_UPDATE_FAILED'
], ZodMessages, true);
//# sourceMappingURL=missions.constants.js.map