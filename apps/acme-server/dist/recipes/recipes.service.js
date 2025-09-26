var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { Inject, Injectable } from '@nestjs/common';
import { and, asc, count, desc, eq, gte, lte, sql } from 'drizzle-orm';
import { throwError } from '~/common/libs';
import { DrizzleAsyncProvider, schema } from '~/drizzle';
var RecipesService = (function () {
    function RecipesService(db) {
        this.db = db;
    }
    RecipesService.prototype.createRecipe = function (data, createdBy) {
        return __awaiter(this, void 0, void 0, function () {
            var recipe, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, this.db
                                .insert(schema.processingRecipes)
                                .values(__assign(__assign({}, data), { created_by: createdBy, input_materials: data.input_materials, output_products: data.output_products }))
                                .returning()];
                    case 1:
                        recipe = _a.sent();
                        if (!(recipe === null || recipe === void 0 ? void 0 : recipe.length)) {
                            throwError('RECIPE_CREATION_FAILED', 500);
                            return [2];
                        }
                        return [2, this.formatRecipeItem(recipe[0])];
                    case 2:
                        error_1 = _a.sent();
                        console.log(error_1);
                        throwError('RECIPE_CREATION_FAILED', 500);
                        return [2];
                    case 3: return [2];
                }
            });
        });
    };
    RecipesService.prototype.getRecipes = function (filters) {
        return __awaiter(this, void 0, void 0, function () {
            var conditions, offset, total, orderBy, recipes, formattedRecipes, totalPages, error_2;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        conditions = this.buildRecipeFiltersCondition(filters);
                        offset = (filters.page - 1) * filters.limit;
                        return [4, this.db.select({ total: count() }).from(schema.processingRecipes).where(conditions)];
                    case 1:
                        total = (_a.sent())[0].total;
                        orderBy = (function () {
                            var isDesc = filters.sort_order === 'desc';
                            switch (filters.sort_by) {
                                case 'name':
                                    return isDesc ? desc(schema.processingRecipes.name) : asc(schema.processingRecipes.name);
                                case 'yield_percentage':
                                    return isDesc
                                        ? desc(schema.processingRecipes.yield_percentage)
                                        : asc(schema.processingRecipes.yield_percentage);
                                case 'energy_required_kwh':
                                    return isDesc
                                        ? desc(schema.processingRecipes.energy_required_kwh)
                                        : asc(schema.processingRecipes.energy_required_kwh);
                                case 'processing_time_minutes':
                                    return isDesc
                                        ? desc(schema.processingRecipes.processing_time_minutes)
                                        : asc(schema.processingRecipes.processing_time_minutes);
                                case 'created_at':
                                default:
                                    return isDesc ? desc(schema.processingRecipes.created_at) : asc(schema.processingRecipes.created_at);
                            }
                        })();
                        return [4, this.db
                                .select()
                                .from(schema.processingRecipes)
                                .orderBy(orderBy)
                                .limit(filters.limit)
                                .offset(offset)
                                .where(conditions)];
                    case 2:
                        recipes = _a.sent();
                        formattedRecipes = recipes.map(function (recipe) { return _this.formatRecipeItem(recipe); });
                        totalPages = Math.ceil(total / filters.limit);
                        return [2, {
                                items: formattedRecipes,
                                pagination: {
                                    has_next: filters.page < totalPages,
                                    has_previous: filters.page > 1,
                                    limit: filters.limit,
                                    page: filters.page,
                                    total: total,
                                    total_pages: totalPages,
                                },
                            }];
                    case 3:
                        error_2 = _a.sent();
                        console.log(error_2);
                        throwError('RECIPE_FETCH_FAILED', 500);
                        return [2];
                    case 4: return [2];
                }
            });
        });
    };
    RecipesService.prototype.validateRecipe = function (id, data) {
        return __awaiter(this, void 0, void 0, function () {
            var recipe, validation, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, this.db.query.processingRecipes.findFirst({
                                where: eq(schema.processingRecipes.id, id),
                            })];
                    case 1:
                        recipe = _a.sent();
                        if (!recipe) {
                            throwError('RECIPE_NOT_FOUND', 404);
                            return [2];
                        }
                        validation = this.performRecipeValidation(recipe, data);
                        return [2, validation];
                    case 2:
                        error_3 = _a.sent();
                        console.log(error_3);
                        throwError('RECIPE_VALIDATION_FAILED', 500);
                        return [2];
                    case 3: return [2];
                }
            });
        });
    };
    RecipesService.prototype.getRecipeRecommendations = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var recipes, recommendations, error_4;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, this.db
                                .select()
                                .from(schema.processingRecipes)
                                .where(eq(schema.processingRecipes.is_active, true))];
                    case 1:
                        recipes = _a.sent();
                        recommendations = recipes
                            .map(function (recipe) { return _this.calculateRecipeSuitability(recipe, data); })
                            .filter(function (rec) { return rec.suitability_score > 0.3; })
                            .sort(function (a, b) { return b.suitability_score - a.suitability_score; })
                            .slice(0, data.max_results);
                        return [2, recommendations];
                    case 2:
                        error_4 = _a.sent();
                        console.log(error_4);
                        throwError('RECIPE_RECOMMENDATIONS_FAILED', 500);
                        return [2];
                    case 3: return [2];
                }
            });
        });
    };
    RecipesService.prototype.deactivateRecipe = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var recipe, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, this.db
                                .update(schema.processingRecipes)
                                .set({
                                is_active: false,
                                updated_at: new Date(),
                            })
                                .where(eq(schema.processingRecipes.id, id))
                                .returning()];
                    case 1:
                        recipe = _a.sent();
                        if (!(recipe === null || recipe === void 0 ? void 0 : recipe.length)) {
                            throwError('RECIPE_NOT_FOUND', 404);
                            return [2];
                        }
                        return [2, this.formatRecipeItem(recipe[0])];
                    case 2:
                        error_5 = _a.sent();
                        console.log(error_5);
                        throwError('RECIPE_FETCH_FAILED', 500);
                        return [2];
                    case 3: return [2];
                }
            });
        });
    };
    RecipesService.prototype.updateRecipe = function (id, data) {
        return __awaiter(this, void 0, void 0, function () {
            var updated, error_6;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4, this.db
                                .update(schema.processingRecipes)
                                .set(__assign(__assign({}, data), { inputs: (_a = data.input_materials) !== null && _a !== void 0 ? _a : undefined, outputs: (_b = data.output_products) !== null && _b !== void 0 ? _b : undefined, updated_at: new Date() }))
                                .where(eq(schema.processingRecipes.id, id))
                                .returning()];
                    case 1:
                        updated = _c.sent();
                        if (!(updated === null || updated === void 0 ? void 0 : updated.length)) {
                            throwError('RECIPE_NOT_FOUND', 404);
                            return [2];
                        }
                        return [2, this.formatRecipeItem(updated[0])];
                    case 2:
                        error_6 = _c.sent();
                        console.log(error_6);
                        throwError('RECIPE_FETCH_FAILED', 500);
                        return [2];
                    case 3: return [2];
                }
            });
        });
    };
    RecipesService.prototype.buildRecipeFiltersCondition = function (filters) {
        var conditions = [];
        if (filters.output_product_type) {
            conditions.push(sql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["", " ? ", ""], ["", " ? ", ""])), schema.processingRecipes.output_products, filters.output_product_type));
        }
        if (filters.input_waste_type) {
            conditions.push(sql(templateObject_2 || (templateObject_2 = __makeTemplateObject(["", " ? ", ""], ["", " ? ", ""])), schema.processingRecipes.input_materials, filters.input_waste_type));
        }
        if (filters.min_yield !== undefined) {
            conditions.push(gte(schema.processingRecipes.yield_percentage, filters.min_yield));
        }
        if (filters.max_energy !== undefined) {
            conditions.push(lte(schema.processingRecipes.energy_required_kwh, String(filters.max_energy)));
        }
        if (filters.max_time !== undefined) {
            conditions.push(lte(schema.processingRecipes.processing_time_minutes, filters.max_time));
        }
        if (filters.required_module) {
            conditions.push(sql(templateObject_3 || (templateObject_3 = __makeTemplateObject(["", " ? ", ""], ["", " ? ", ""])), schema.processingRecipes.required_modules, filters.required_module));
        }
        if (filters.is_active !== undefined) {
            conditions.push(eq(schema.processingRecipes.is_active, filters.is_active));
        }
        if (filters.created_by) {
            conditions.push(eq(schema.processingRecipes.created_by, filters.created_by));
        }
        if (conditions.length === 0)
            return sql(templateObject_4 || (templateObject_4 = __makeTemplateObject(["1=1"], ["1=1"])));
        var whereCond = conditions[0];
        for (var i = 1; i < conditions.length; i++) {
            whereCond = and(whereCond, conditions[i]);
        }
        return whereCond;
    };
    RecipesService.prototype.formatRecipeItem = function (item) {
        var _a, _b;
        return __assign(__assign({}, item), { efficiency_score: Number((_a = item.efficiency_score) !== null && _a !== void 0 ? _a : 1), energy_required_kwh: Number(item.energy_required_kwh), input_materials: item.input_materials, output_products: item.output_products, processing_time_minutes: Number(item.processing_time_minutes), quality_score: Number(item.quality_score), usage_count: Number((_b = item.usage_count) !== null && _b !== void 0 ? _b : 0), yield_percentage: Number(item.yield_percentage) });
    };
    RecipesService.prototype.performRecipeValidation = function (recipe, data) {
        var _a, _b, _c;
        var requiredMaterials = recipe.inputs;
        var available = data.available_waste;
        var materials_available = Object.entries(requiredMaterials).every(function (_a) {
            var _b;
            var k = _a[0], v = _a[1];
            return ((_b = available[k]) !== null && _b !== void 0 ? _b : 0) >= Number(v);
        });
        var modules_available = recipe.required_modules.every(function (m) { return data.available_modules.includes(m); });
        var energy_required = Number(recipe.energy_required_kwh);
        var time_required = Number(recipe.processing_time_minutes);
        var energy_sufficient = data.energy_budget_kwh ? data.energy_budget_kwh >= energy_required : true;
        var time_sufficient = data.time_budget_minutes ? data.time_budget_minutes >= time_required : true;
        var is_feasible = materials_available && modules_available && energy_sufficient && time_sufficient;
        var missing_requirements = {};
        if (!materials_available) {
            var materials = {};
            for (var _i = 0, _d = Object.entries(requiredMaterials); _i < _d.length; _i++) {
                var _e = _d[_i], k = _e[0], v = _e[1];
                var have = (_a = available[k]) !== null && _a !== void 0 ? _a : 0;
                if (have < Number(v))
                    materials[k] = Number(v) - have;
            }
            missing_requirements.materials = materials;
        }
        if (!modules_available) {
            var needed = recipe.required_modules.filter(function (m) { return !data.available_modules.includes(m); });
            missing_requirements.modules = needed;
        }
        if (!energy_sufficient) {
            missing_requirements.additional_energy_kwh = energy_required - ((_b = data.energy_budget_kwh) !== null && _b !== void 0 ? _b : 0);
        }
        if (!time_sufficient) {
            missing_requirements.additional_time_minutes = time_required - ((_c = data.time_budget_minutes) !== null && _c !== void 0 ? _c : 0);
        }
        var estimated_outputs = {};
        for (var _f = 0, _g = Object.entries(recipe.outputs); _f < _g.length; _f++) {
            var _h = _g[_f], k = _h[0], v = _h[1];
            estimated_outputs[k] = Number(v) * Number(recipe.yield_percentage);
        }
        return {
            estimated_outputs: estimated_outputs,
            is_feasible: is_feasible,
            missing_requirements: missing_requirements,
            resource_utilization: {
                energy_percent: data.energy_budget_kwh ? energy_required / data.energy_budget_kwh : 0,
                time_percent: data.time_budget_minutes ? time_required / data.time_budget_minutes : 0,
            },
            validation_results: { energy_sufficient: energy_sufficient, materials_available: materials_available, modules_available: modules_available, time_sufficient: time_sufficient },
        };
    };
    RecipesService.prototype.calculateRecipeSuitability = function (recipe, data) {
        var _a;
        var outputs = recipe.outputs;
        var desired = new Set((_a = data.desired_products) !== null && _a !== void 0 ? _a : []);
        var desiredMatch = desired.size
            ? Object.keys(outputs).filter(function (p) { return desired.has(p); }).length / desired.size
            : 0.5;
        var inputs = recipe.inputs;
        var requiredSum = Object.values(inputs).reduce(function (a, b) { return a + Number(b); }, 0);
        var availableMatch = Object.entries(inputs).reduce(function (sum, _a) {
            var _b;
            var k = _a[0], v = _a[1];
            var have = (_b = data.available_waste[k]) !== null && _b !== void 0 ? _b : 0;
            return sum + Math.min(have, Number(v));
        }, 0);
        var wasteUtilization = requiredSum ? availableMatch / requiredSum : 0;
        var suitability_score = 0.5 * desiredMatch + 0.5 * wasteUtilization;
        if (data.optimization_goal === 'maximize_yield')
            suitability_score *= Number(recipe.yield_percentage);
        if (data.optimization_goal === 'minimize_energy')
            suitability_score *= 1 / (1 + Number(recipe.energy_required_kwh));
        if (data.optimization_goal === 'minimize_time')
            suitability_score *= 1 / (1 + Number(recipe.processing_time_minutes));
        var estimated_outputs = {};
        for (var _i = 0, _b = Object.entries(outputs); _i < _b.length; _i++) {
            var _c = _b[_i], k = _c[0], v = _c[1];
            estimated_outputs[k] = Number(v) * Number(recipe.yield_percentage);
        }
        return {
            estimated_outputs: estimated_outputs,
            reasoning: 'Based on desired products, waste availability, and optimization goal',
            recipe_id: recipe.id,
            recipe_name: recipe.name,
            resource_requirements: {
                energy_kwh: Number(recipe.energy_required_kwh),
                modules: recipe.required_modules,
                time_minutes: Number(recipe.processing_time_minutes),
            },
            suitability_score: suitability_score,
            waste_utilization: inputs,
        };
    };
    RecipesService = __decorate([
        Injectable(),
        __param(0, Inject(DrizzleAsyncProvider)),
        __metadata("design:paramtypes", [Function])
    ], RecipesService);
    return RecipesService;
}());
export { RecipesService };
var templateObject_1, templateObject_2, templateObject_3, templateObject_4;
//# sourceMappingURL=recipes.service.js.map