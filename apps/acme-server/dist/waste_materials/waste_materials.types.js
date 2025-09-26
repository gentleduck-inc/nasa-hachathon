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
import { createWasteMaterialSchema, updateWasteMaterialSchema } from './waste_materials.dto';
var CreateWasteMaterialDto = (function (_super) {
    __extends(CreateWasteMaterialDto, _super);
    function CreateWasteMaterialDto() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return CreateWasteMaterialDto;
}(createZodDto(createWasteMaterialSchema)));
export { CreateWasteMaterialDto };
var UpdateWasteMaterialDto = (function (_super) {
    __extends(UpdateWasteMaterialDto, _super);
    function UpdateWasteMaterialDto() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return UpdateWasteMaterialDto;
}(createZodDto(updateWasteMaterialSchema)));
export { UpdateWasteMaterialDto };
//# sourceMappingURL=waste_materials.types.js.map