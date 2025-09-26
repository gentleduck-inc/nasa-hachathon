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
import { createRunSchema, runFiltersSchema } from './processing_runs.dto';
var CreateRunDto = (function (_super) {
    __extends(CreateRunDto, _super);
    function CreateRunDto() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return CreateRunDto;
}(createZodDto(createRunSchema)));
export { CreateRunDto };
var RunFiltersDto = (function (_super) {
    __extends(RunFiltersDto, _super);
    function RunFiltersDto() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return RunFiltersDto;
}(createZodDto(runFiltersSchema)));
export { RunFiltersDto };
//# sourceMappingURL=processing_runs.types.js.map