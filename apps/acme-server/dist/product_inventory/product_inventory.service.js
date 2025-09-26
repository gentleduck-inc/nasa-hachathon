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
import { and, asc, count, desc, eq, sql } from 'drizzle-orm';
import { throwError } from '~/common/libs';
import { DrizzleAsyncProvider, schema } from '~/drizzle';
var ProductInventoryService = (function () {
    function ProductInventoryService(db) {
        this.db = db;
    }
    ProductInventoryService.prototype.list = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var page, limit, offset, where, total, items, error_1;
            var _this = this;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 3, , 4]);
                        page = (_a = params.page) !== null && _a !== void 0 ? _a : 1;
                        limit = (_b = params.limit) !== null && _b !== void 0 ? _b : 20;
                        offset = (page - 1) * limit;
                        where = this.buildFilters(params);
                        return [4, this.db.select({ total: count() }).from(schema.productInventory).where(where)];
                    case 1:
                        total = (_c.sent())[0].total;
                        return [4, this.db
                                .select()
                                .from(schema.productInventory)
                                .where(where)
                                .orderBy(desc(schema.productInventory.created_at))
                                .limit(limit)
                                .offset(offset)];
                    case 2:
                        items = _c.sent();
                        return [2, {
                                items: items.map(function (i) { return _this.format(i); }),
                                pagination: {
                                    has_next: page * limit < total,
                                    has_previous: page > 1,
                                    limit: limit,
                                    page: page,
                                    total: total,
                                    total_pages: Math.ceil(total / limit),
                                },
                            }];
                    case 3:
                        error_1 = _c.sent();
                        console.log(error_1);
                        throwError('PRODUCT_FETCH_FAILED', 500);
                        return [2];
                    case 4: return [2];
                }
            });
        });
    };
    ProductInventoryService.prototype.addProduct = function (body) {
        return __awaiter(this, void 0, void 0, function () {
            var row, error_2;
            var _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 2, , 3]);
                        return [4, this.db
                                .insert(schema.productInventory)
                                .values({
                                location: body.location,
                                product_type: body.product_type,
                                production_run_id: (_a = body.production_run_id) !== null && _a !== void 0 ? _a : null,
                                properties: (_b = body.properties) !== null && _b !== void 0 ? _b : {},
                                quality_score: (_c = body.quality_score) !== null && _c !== void 0 ? _c : 1,
                                quantity: Number(body.quantity),
                                total_mass_kg: String(body.total_mass_kg),
                            })
                                .returning()];
                    case 1:
                        row = (_d.sent())[0];
                        if (!row) {
                            throwError('PRODUCT_CREATE_FAILED', 500);
                            return [2];
                        }
                        return [2, this.format(row)];
                    case 2:
                        error_2 = _d.sent();
                        console.log(error_2);
                        throwError('PRODUCT_CREATE_FAILED', 500);
                        return [2];
                    case 3: return [2];
                }
            });
        });
    };
    ProductInventoryService.prototype.reserve = function (id, body) {
        return __awaiter(this, void 0, void 0, function () {
            var current, newReserved, is_available, row, error_3;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        return [4, this.db.query.productInventory.findFirst({ where: eq(schema.productInventory.id, id) })];
                    case 1:
                        current = _b.sent();
                        if (!current) {
                            throwError('PRODUCT_NOT_FOUND', 404);
                            return [2];
                        }
                        newReserved = Number((_a = current.reserved_quantity) !== null && _a !== void 0 ? _a : 0) + Number(body.amount);
                        is_available = Number(current.quantity) - newReserved > 0 && current.is_available;
                        return [4, this.db
                                .update(schema.productInventory)
                                .set({ is_available: is_available, reserved_quantity: newReserved, updated_at: new Date() })
                                .where(eq(schema.productInventory.id, id))
                                .returning()];
                    case 2:
                        row = (_b.sent())[0];
                        if (!row) {
                            throwError('PRODUCT_UPDATE_FAILED', 500);
                            return [2];
                        }
                        return [2, this.format(row)];
                    case 3:
                        error_3 = _b.sent();
                        console.log(error_3);
                        throwError('PRODUCT_UPDATE_FAILED', 500);
                        return [2];
                    case 4: return [2];
                }
            });
        });
    };
    ProductInventoryService.prototype.consume = function (id, body) {
        return __awaiter(this, void 0, void 0, function () {
            var current, remaining, is_available, row, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4, this.db.query.productInventory.findFirst({ where: eq(schema.productInventory.id, id) })];
                    case 1:
                        current = _a.sent();
                        if (!current) {
                            throwError('PRODUCT_NOT_FOUND', 404);
                            return [2];
                        }
                        remaining = Math.max(0, Number(current.quantity) - Number(body.amount));
                        is_available = remaining > 0;
                        return [4, this.db
                                .update(schema.productInventory)
                                .set({ is_available: is_available, quantity: remaining, updated_at: new Date() })
                                .where(eq(schema.productInventory.id, id))
                                .returning()];
                    case 2:
                        row = (_a.sent())[0];
                        if (!row) {
                            throwError('PRODUCT_UPDATE_FAILED', 500);
                            return [2];
                        }
                        return [2, this.format(row)];
                    case 3:
                        error_4 = _a.sent();
                        console.log(error_4);
                        throwError('PRODUCT_UPDATE_FAILED', 500);
                        return [2];
                    case 4: return [2];
                }
            });
        });
    };
    ProductInventoryService.prototype.availabilityByType = function () {
        return __awaiter(this, void 0, void 0, function () {
            var rows, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, this.db
                                .select({
                                available: sql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["SUM( GREATEST(", " - ", ", 0) )"], ["SUM( GREATEST(", " - ", ", 0) )"])), schema.productInventory.quantity, schema.productInventory.reserved_quantity).as('available'),
                                product_type: schema.productInventory.product_type,
                                total_quantity: sql(templateObject_2 || (templateObject_2 = __makeTemplateObject(["SUM(", ")"], ["SUM(", ")"])), schema.productInventory.quantity).as('total_quantity'),
                            })
                                .from(schema.productInventory)
                                .groupBy(schema.productInventory.product_type)
                                .orderBy(asc(schema.productInventory.product_type))];
                    case 1:
                        rows = _a.sent();
                        return [2, rows];
                    case 2:
                        error_5 = _a.sent();
                        console.log(error_5);
                        throwError('PRODUCT_AVAILABILITY_FETCH_SUCCESS', 500);
                        return [2];
                    case 3: return [2];
                }
            });
        });
    };
    ProductInventoryService.prototype.distributionByLocation = function () {
        return __awaiter(this, void 0, void 0, function () {
            var rows, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, this.db
                                .select({
                                count: sql(templateObject_3 || (templateObject_3 = __makeTemplateObject(["COUNT(*)"], ["COUNT(*)"]))).as('count'),
                                location: schema.productInventory.location,
                                total_quantity: sql(templateObject_4 || (templateObject_4 = __makeTemplateObject(["SUM(", ")"], ["SUM(", ")"])), schema.productInventory.quantity).as('total_quantity'),
                            })
                                .from(schema.productInventory)
                                .groupBy(schema.productInventory.location)
                                .orderBy(asc(schema.productInventory.location))];
                    case 1:
                        rows = _a.sent();
                        return [2, rows];
                    case 2:
                        error_6 = _a.sent();
                        console.log(error_6);
                        throwError('PRODUCT_DISTRIBUTION_FETCH_SUCCESS', 500);
                        return [2];
                    case 3: return [2];
                }
            });
        });
    };
    ProductInventoryService.prototype.buildFilters = function (params) {
        var conds = [];
        if (params.product_type)
            conds.push(eq(schema.productInventory.product_type, params.product_type));
        if (params.location)
            conds.push(eq(schema.productInventory.location, params.location));
        if (params.available === true) {
            conds.push(eq(schema.productInventory.is_available, true));
        }
        if (conds.length === 0)
            return sql(templateObject_5 || (templateObject_5 = __makeTemplateObject(["1=1"], ["1=1"])));
        var whereCond = conds[0];
        for (var i = 1; i < conds.length; i++)
            whereCond = and(whereCond, conds[i]);
        return whereCond;
    };
    ProductInventoryService.prototype.format = function (i) {
        var _a;
        return __assign(__assign({}, i), { quality_score: Number(i.quality_score), quantity: Number(i.quantity), reserved_quantity: Number((_a = i.reserved_quantity) !== null && _a !== void 0 ? _a : 0), total_mass_kg: Number(i.total_mass_kg) });
    };
    ProductInventoryService = __decorate([
        Injectable(),
        __param(0, Inject(DrizzleAsyncProvider)),
        __metadata("design:paramtypes", [Function])
    ], ProductInventoryService);
    return ProductInventoryService;
}());
export { ProductInventoryService };
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5;
//# sourceMappingURL=product_inventory.service.js.map