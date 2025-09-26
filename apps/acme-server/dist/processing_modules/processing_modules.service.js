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
import { randomUUID } from 'node:crypto';
import { and, asc, count, eq, sql } from 'drizzle-orm';
import { throwError } from '~/common/libs';
import { DrizzleAsyncProvider, schema } from '~/drizzle';
var ProcessingModulesService = (function () {
    function ProcessingModulesService(db) {
        this.db = db;
    }
    ProcessingModulesService.prototype.listModules = function (filters) {
        return __awaiter(this, void 0, void 0, function () {
            var page, limit, offset, where, total, items, total_pages, error_1;
            var _this = this;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 3, , 4]);
                        page = (_a = filters.page) !== null && _a !== void 0 ? _a : 1;
                        limit = (_b = filters.limit) !== null && _b !== void 0 ? _b : 20;
                        offset = (page - 1) * limit;
                        where = this.buildFilters(filters);
                        return [4, this.db.select({ total: count() }).from(schema.processingModules).where(where)];
                    case 1:
                        total = (_c.sent())[0].total;
                        return [4, this.db
                                .select()
                                .from(schema.processingModules)
                                .where(where)
                                .orderBy(asc(schema.processingModules.name))
                                .limit(limit)
                                .offset(offset)];
                    case 2:
                        items = _c.sent();
                        total_pages = Math.ceil(total / limit);
                        return [2, {
                                items: items.map(function (m) { return _this.format(m); }),
                                pagination: {
                                    has_next: page < total_pages,
                                    has_previous: page > 1,
                                    limit: limit,
                                    page: page,
                                    total: total,
                                    total_pages: total_pages,
                                },
                            }];
                    case 3:
                        error_1 = _c.sent();
                        console.log(error_1);
                        throwError('MODULE_LIST_FETCH_FAILED', 500);
                        return [2];
                    case 4: return [2];
                }
            });
        });
    };
    ProcessingModulesService.prototype.getModuleById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var module_1, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, this.db.query.processingModules.findFirst({ where: eq(schema.processingModules.id, id) })];
                    case 1:
                        module_1 = _a.sent();
                        if (!module_1) {
                            throwError('MODULE_NOT_FOUND', 404);
                            return [2];
                        }
                        return [2, this.format(module_1)];
                    case 2:
                        error_2 = _a.sent();
                        console.log(error_2);
                        throwError('MODULE_FETCH_FAILED', 500);
                        return [2];
                    case 3: return [2];
                }
            });
        });
    };
    ProcessingModulesService.prototype.createModule = function (input) {
        return __awaiter(this, void 0, void 0, function () {
            var row, error_3;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4, this.db
                                .insert(schema.processingModules)
                                .values({
                                name: input.name,
                                module_type: input.module_type,
                                throughput_kg_per_hour: String(input.throughput_kg_per_hour),
                                power_consumption_kw: String(input.power_consumption_kw),
                                efficiency_rating: (_a = input.efficiency_rating) !== null && _a !== void 0 ? _a : 1,
                                capabilities: (_b = input.capabilities) !== null && _b !== void 0 ? _b : {},
                                status: 'active',
                            })
                                .returning()];
                    case 1:
                        row = (_c.sent())[0];
                        if (!row) {
                            throwError('MODULE_CREATE_FAILED', 500);
                            return [2];
                        }
                        return [2, this.format(row)];
                    case 2:
                        error_3 = _c.sent();
                        console.log(error_3);
                        throwError('MODULE_CREATE_FAILED', 500);
                        return [2];
                    case 3: return [2];
                }
            });
        });
    };
    ProcessingModulesService.prototype.updateModule = function (id, input) {
        return __awaiter(this, void 0, void 0, function () {
            var current, row, error_4;
            var _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 3, , 4]);
                        return [4, this.db.query.processingModules.findFirst({ where: eq(schema.processingModules.id, id) })];
                    case 1:
                        current = _d.sent();
                        if (!current) {
                            throwError('MODULE_NOT_FOUND', 404);
                            return [2];
                        }
                        return [4, this.db
                                .update(schema.processingModules)
                                .set({
                                status: (_a = input.status) !== null && _a !== void 0 ? _a : current.status,
                                throughput_kg_per_hour: input.throughput_kg_per_hour != null ? String(input.throughput_kg_per_hour) : current.throughput_kg_per_hour,
                                power_consumption_kw: input.power_consumption_kw != null ? String(input.power_consumption_kw) : current.power_consumption_kw,
                                efficiency_rating: (_b = input.efficiency_rating) !== null && _b !== void 0 ? _b : current.efficiency_rating,
                                capabilities: (_c = input.capabilities) !== null && _c !== void 0 ? _c : current.capabilities,
                                updated_at: new Date(),
                            })
                                .where(eq(schema.processingModules.id, id))
                                .returning()];
                    case 2:
                        row = (_d.sent())[0];
                        if (!row) {
                            throwError('MODULE_UPDATE_FAILED', 500);
                            return [2];
                        }
                        return [2, this.format(row)];
                    case 3:
                        error_4 = _d.sent();
                        console.log(error_4);
                        throwError('MODULE_UPDATE_FAILED', 500);
                        return [2];
                    case 4: return [2];
                }
            });
        });
    };
    ProcessingModulesService.prototype.reserveModule = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var current, token, newCaps, row, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4, this.db.query.processingModules.findFirst({ where: eq(schema.processingModules.id, id) })];
                    case 1:
                        current = _a.sent();
                        if (!current) {
                            throwError('MODULE_NOT_FOUND', 404);
                            return [2];
                        }
                        if (current.status !== 'active' || current.current_recipe_id) {
                            throwError('MODULE_RESERVE_FAILED', 400);
                            return [2];
                        }
                        token = randomUUID();
                        newCaps = __assign(__assign({}, current.capabilities), { reservation_token: token, reserved_at: new Date().toISOString() });
                        return [4, this.db
                                .update(schema.processingModules)
                                .set({ capabilities: newCaps, updated_at: new Date() })
                                .where(eq(schema.processingModules.id, id))
                                .returning()];
                    case 2:
                        row = (_a.sent())[0];
                        if (!row) {
                            throwError('MODULE_RESERVE_FAILED', 500);
                            return [2];
                        }
                        return [2, { token: token, module: this.format(row) }];
                    case 3:
                        error_5 = _a.sent();
                        console.log(error_5);
                        throwError('MODULE_RESERVE_FAILED', 500);
                        return [2];
                    case 4: return [2];
                }
            });
        });
    };
    ProcessingModulesService.prototype.releaseModule = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var current, caps, row, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4, this.db.query.processingModules.findFirst({ where: eq(schema.processingModules.id, id) })];
                    case 1:
                        current = _a.sent();
                        if (!current) {
                            throwError('MODULE_NOT_FOUND', 404);
                            return [2];
                        }
                        caps = __assign({}, current.capabilities);
                        delete caps.reservation_token;
                        delete caps.reserved_at;
                        return [4, this.db
                                .update(schema.processingModules)
                                .set({ capabilities: caps, updated_at: new Date() })
                                .where(eq(schema.processingModules.id, id))
                                .returning()];
                    case 2:
                        row = (_a.sent())[0];
                        if (!row) {
                            throwError('MODULE_RELEASE_FAILED', 500);
                            return [2];
                        }
                        return [2, this.format(row)];
                    case 3:
                        error_6 = _a.sent();
                        console.log(error_6);
                        throwError('MODULE_RELEASE_FAILED', 500);
                        return [2];
                    case 4: return [2];
                }
            });
        });
    };
    ProcessingModulesService.prototype.setMaintenance = function (id, input) {
        return __awaiter(this, void 0, void 0, function () {
            var current, mod, error_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4, this.db.query.processingModules.findFirst({ where: eq(schema.processingModules.id, id) })];
                    case 1:
                        current = _a.sent();
                        if (!current) {
                            throwError('MODULE_NOT_FOUND', 404);
                            return [2];
                        }
                        return [4, this.db
                                .update(schema.processingModules)
                                .set({ status: 'maintenance', updated_at: new Date() })
                                .where(eq(schema.processingModules.id, id))
                                .returning()];
                    case 2:
                        mod = (_a.sent())[0];
                        if (!(input.maintenance_type || input.description || input.scheduled_date)) return [3, 4];
                        return [4, this.db
                                .insert(schema.maintenanceRecords)
                                .values({
                                module_id: id,
                                maintenance_type: input.maintenance_type || 'inspection',
                                description: input.description || null,
                                scheduled_date: input.scheduled_date ? new Date(input.scheduled_date) : null,
                                performed_by: input.performed_by || null,
                                parts_replaced: input.parts_replaced || [],
                                duration_hours: input.duration_hours != null ? String(input.duration_hours) : null,
                                status: 'scheduled',
                            })
                                .returning()];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [2, this.format(mod)];
                    case 5:
                        error_7 = _a.sent();
                        console.log(error_7);
                        throwError('MODULE_MAINTENANCE_SET_FAILED', 500);
                        return [2];
                    case 6: return [2];
                }
            });
        });
    };
    ProcessingModulesService.prototype.buildFilters = function (filters) {
        var parts = [sql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["1=1"], ["1=1"])))];
        if (filters.type)
            parts.push(eq(schema.processingModules.module_type, filters.type));
        if (filters.status)
            parts.push(eq(schema.processingModules.status, filters.status));
        var cond = parts[0];
        for (var i = 1; i < parts.length; i++)
            cond = and(cond, parts[i]);
        return cond;
    };
    ProcessingModulesService.prototype.format = function (row) {
        var _a;
        return __assign(__assign({}, row), { throughput_kg_per_hour: Number(row.throughput_kg_per_hour), power_consumption_kw: Number(row.power_consumption_kw), efficiency_rating: Number(row.efficiency_rating), is_available: row.status === 'active' && !row.current_recipe_id && !((_a = row.capabilities) === null || _a === void 0 ? void 0 : _a.reservation_token) });
    };
    ProcessingModulesService = __decorate([
        Injectable(),
        __param(0, Inject(DrizzleAsyncProvider)),
        __metadata("design:paramtypes", [Function])
    ], ProcessingModulesService);
    return ProcessingModulesService;
}());
export { ProcessingModulesService };
var templateObject_1;
//# sourceMappingURL=processing_modules.service.js.map