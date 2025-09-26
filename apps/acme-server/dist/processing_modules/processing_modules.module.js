var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Module } from '@nestjs/common';
import { ProcessingModulesController } from './processing_modules.controller';
import { ProcessingModulesService } from './processing_modules.service';
var ProcessingModulesModule = (function () {
    function ProcessingModulesModule() {
    }
    ProcessingModulesModule = __decorate([
        Module({
            controllers: [ProcessingModulesController],
            exports: [ProcessingModulesService],
            providers: [ProcessingModulesService],
        })
    ], ProcessingModulesModule);
    return ProcessingModulesModule;
}());
export { ProcessingModulesModule };
//# sourceMappingURL=processing_modules.module.js.map