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
export var RecipesMessages = __spreadArray([
    'RECIPE_CREATED_SUCCESS',
    'RECIPE_UPDATED_SUCCESS',
    'RECIPE_DELETED_SUCCESS',
    'RECIPE_FETCH_SUCCESS',
    'RECIPE_VALIDATED_SUCCESS',
    'RECIPE_RECOMMENDATIONS_SUCCESS',
    'RECIPE_DEACTIVATED_SUCCESS',
    'RECIPE_CREATION_FAILED',
    'RECIPE_UPDATE_FAILED',
    'RECIPE_DELETE_FAILED',
    'RECIPE_FETCH_FAILED',
    'RECIPE_NOT_FOUND',
    'RECIPE_VALIDATION_FAILED',
    'RECIPE_RECOMMENDATIONS_FAILED',
    'RECIPE_INVALID_INPUTS',
    'RECIPE_INVALID_OUTPUTS',
    'RECIPE_INSUFFICIENT_MODULES',
    'RECIPE_IN_USE'
], ZodMessages, true);
//# sourceMappingURL=recipes.constants.js.map