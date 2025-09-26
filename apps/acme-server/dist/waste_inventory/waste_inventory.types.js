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
import { createWasteInventorySchema, updateWasteInventorySchema } from './waste_inventory.dto';
var CreateWasteInventoryDto = (function (_super) {
    __extends(CreateWasteInventoryDto, _super);
    function CreateWasteInventoryDto() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return CreateWasteInventoryDto;
}(createZodDto(createWasteInventorySchema)));
export { CreateWasteInventoryDto };
var UpdateWasteInventoryDto = (function (_super) {
    __extends(UpdateWasteInventoryDto, _super);
    function UpdateWasteInventoryDto() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return UpdateWasteInventoryDto;
}(createZodDto(updateWasteInventorySchema)));
export { UpdateWasteInventoryDto };
//# sourceMappingURL=waste_inventory.types.js.map