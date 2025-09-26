var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth';
import { DrizzleModule } from './drizzle';
import { EmailModule } from './email';
import { LoggerModule } from './logger';
import { MinioModule } from './minio';
import { MissionsModule } from './missions/missions.module';
import { ProcessingModulesModule } from './processing_modules/processing_modules.module';
import { ProcessingRecipesModule } from './processing_recipes/processing_recipes.module';
import { ProcessingRunsModule } from './processing_runs/processing_runs.module';
import { ProductInventoryModule } from './product_inventory/product_inventory.module';
import { RedisModule } from './redis';
import { ResourceMonitoringModule } from './resource_monitoring/resource_monitoring.module';
import { WasteInventoryModule } from './waste_inventory/waste_inventory.module';
import { WasteMaterialsModule } from './waste_materials';
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Module({
            controllers: [],
            imports: [
                ConfigModule.forRoot({
                    envFilePath: '.env',
                    isGlobal: true,
                }),
                LoggerModule,
                DrizzleModule,
                RedisModule,
                MinioModule,
                EmailModule,
                AuthModule,
                WasteMaterialsModule,
                WasteInventoryModule,
                MissionsModule,
                ProcessingModulesModule,
                ProcessingRecipesModule,
                ProductInventoryModule,
                ResourceMonitoringModule,
                ProcessingRunsModule,
            ],
            providers: [],
        })
    ], AppModule);
    return AppModule;
}());
export { AppModule };
//# sourceMappingURL=app.module.js.map