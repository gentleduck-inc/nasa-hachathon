var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { createZodDto } from 'nestjs-zod';
import { createRecipeSchema, recipeFiltersSchema, recommendationFiltersSchema, updateRecipeSchema, validateRecipeSchema, } from './recipes.dto';
var CreateRecipeDto = (function (_super) {
    __extends(CreateRecipeDto, _super);
    function CreateRecipeDto() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return CreateRecipeDto;
}(createZodDto(createRecipeSchema)));
export { CreateRecipeDto };
var UpdateRecipeDto = (function (_super) {
    __extends(UpdateRecipeDto, _super);
    function UpdateRecipeDto() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return UpdateRecipeDto;
}(createZodDto(updateRecipeSchema)));
export { UpdateRecipeDto };
var RecipeFiltersDto = (function (_super) {
    __extends(RecipeFiltersDto, _super);
    function RecipeFiltersDto() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return RecipeFiltersDto;
}(createZodDto(recipeFiltersSchema)));
export { RecipeFiltersDto };
var ValidateRecipeDto = (function (_super) {
    __extends(ValidateRecipeDto, _super);
    function ValidateRecipeDto() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ValidateRecipeDto;
}(createZodDto(validateRecipeSchema)));
export { ValidateRecipeDto };
var RecommendationFiltersDto = (function (_super) {
    __extends(RecommendationFiltersDto, _super);
    function RecommendationFiltersDto() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return RecommendationFiltersDto;
}(createZodDto(recommendationFiltersSchema)));
export { RecommendationFiltersDto };
//# sourceMappingURL=recipes.types.js.map