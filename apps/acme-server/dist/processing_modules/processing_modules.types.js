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
import { createModuleSchema, maintenanceSchema, moduleFiltersSchema, updateModuleSchema } from './processing_modules.dto';
var ModuleFiltersDto = (function (_super) {
    __extends(ModuleFiltersDto, _super);
    function ModuleFiltersDto() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ModuleFiltersDto;
}(createZodDto(moduleFiltersSchema)));
export { ModuleFiltersDto };
var CreateModuleDto = (function (_super) {
    __extends(CreateModuleDto, _super);
    function CreateModuleDto() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return CreateModuleDto;
}(createZodDto(createModuleSchema)));
export { CreateModuleDto };
var UpdateModuleDto = (function (_super) {
    __extends(UpdateModuleDto, _super);
    function UpdateModuleDto() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return UpdateModuleDto;
}(createZodDto(updateModuleSchema)));
export { UpdateModuleDto };
var MaintenanceDto = (function (_super) {
    __extends(MaintenanceDto, _super);
    function MaintenanceDto() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return MaintenanceDto;
}(createZodDto(maintenanceSchema)));
export { MaintenanceDto };
//# sourceMappingURL=processing_modules.types.js.map