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
import { assignCrewSchema, createMissionSchema, updateMissionSchema, updateMissionStatusSchema } from './missions.dto';
var CreateMissionDto = (function (_super) {
    __extends(CreateMissionDto, _super);
    function CreateMissionDto() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return CreateMissionDto;
}(createZodDto(createMissionSchema)));
export { CreateMissionDto };
var UpdateMissionDto = (function (_super) {
    __extends(UpdateMissionDto, _super);
    function UpdateMissionDto() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return UpdateMissionDto;
}(createZodDto(updateMissionSchema)));
export { UpdateMissionDto };
var AssignCrewDto = (function (_super) {
    __extends(AssignCrewDto, _super);
    function AssignCrewDto() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return AssignCrewDto;
}(createZodDto(assignCrewSchema)));
export { AssignCrewDto };
var UpdateMissionStatusDto = (function (_super) {
    __extends(UpdateMissionStatusDto, _super);
    function UpdateMissionStatusDto() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return UpdateMissionStatusDto;
}(createZodDto(updateMissionStatusSchema)));
export { UpdateMissionStatusDto };
//# sourceMappingURL=missions.types.js.map