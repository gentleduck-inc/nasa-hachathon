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
var ResourceMonitoringService = (function () {
    function ResourceMonitoringService(db) {
        this.db = db;
    }
    ResourceMonitoringService.prototype.listUsage = function (filters) {
        return __awaiter(this, void 0, void 0, function () {
            var page, limit, offset, where, total, items, error_1;
            var _this = this;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 3, , 4]);
                        page = (_a = filters.page) !== null && _a !== void 0 ? _a : 1;
                        limit = (_b = filters.limit) !== null && _b !== void 0 ? _b : 20;
                        offset = (page - 1) * limit;
                        where = this.buildUsageFilters(filters);
                        return [4, this.db.select({ total: count() }).from(schema.resourceUsage).where(where)];
                    case 1:
                        total = (_c.sent())[0].total;
                        return [4, this.db
                                .select()
                                .from(schema.resourceUsage)
                                .where(where)
                                .orderBy(desc(schema.resourceUsage.usage_date))
                                .limit(limit)
                                .offset(offset)];
                    case 2:
                        items = _c.sent();
                        return [2, {
                                items: items.map(function (i) { return _this.formatUsage(i); }),
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
                        throwError('RESOURCE_USAGE_FETCH_FAILED', 500);
                        return [2];
                    case 4: return [2];
                }
            });
        });
    };
    ResourceMonitoringService.prototype.createUsage = function (body) {
        return __awaiter(this, void 0, void 0, function () {
            var row, error_2;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4, this.db
                                .insert(schema.resourceUsage)
                                .values({
                                cost_estimate: body.cost_estimate != null ? String(body.cost_estimate) : null,
                                module_id: (_a = body.module_id) !== null && _a !== void 0 ? _a : null,
                                processing_run_id: (_b = body.processing_run_id) !== null && _b !== void 0 ? _b : null,
                                quantity_used: String(body.quantity_used),
                                resource_type: body.resource_type,
                                unit: body.unit,
                                usage_date: new Date(body.usage_date),
                            })
                                .returning()];
                    case 1:
                        row = (_c.sent())[0];
                        if (!row) {
                            throwError('RESOURCE_USAGE_CREATE_FAILED', 500);
                            return [2];
                        }
                        return [2, this.formatUsage(row)];
                    case 2:
                        error_2 = _c.sent();
                        console.log(error_2);
                        throwError('RESOURCE_USAGE_CREATE_FAILED', 500);
                        return [2];
                    case 3: return [2];
                }
            });
        });
    };
    ResourceMonitoringService.prototype.dailySummary = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var where, rows, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        where = this.buildDailyFilters(params);
                        return [4, this.db
                                .select()
                                .from(schema.dailyMetrics)
                                .where(where)
                                .orderBy(asc(schema.dailyMetrics.metric_date))];
                    case 1:
                        rows = _a.sent();
                        return [2, rows.map(function (r) { return (__assign(__assign({}, r), { energy_consumed_kwh: Number(r.energy_consumed_kwh), module_uptime_percent: Number(r.module_uptime_percent), processing_efficiency: Number(r.processing_efficiency), products_created_count: Number(r.products_created_count), waste_processed_kg: Number(r.waste_processed_kg) })); })];
                    case 2:
                        error_3 = _a.sent();
                        console.log(error_3);
                        throwError('RESOURCE_DAILY_SUMMARY_FAILED', 500);
                        return [2];
                    case 3: return [2];
                }
            });
        });
    };
    ResourceMonitoringService.prototype.efficiencyTrends = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var where, rows, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        where = this.buildDailyFilters(params);
                        return [4, this.db
                                .select({
                                date: schema.dailyMetrics.metric_date,
                                module_uptime_percent: schema.dailyMetrics.module_uptime_percent,
                                processing_efficiency: schema.dailyMetrics.processing_efficiency,
                                quality: schema.dailyMetrics.quality_score_average,
                            })
                                .from(schema.dailyMetrics)
                                .where(where)
                                .orderBy(asc(schema.dailyMetrics.metric_date))];
                    case 1:
                        rows = _a.sent();
                        return [2, rows.map(function (r) { return ({
                                date: r.date,
                                module_uptime_percent: Number(r.module_uptime_percent),
                                processing_efficiency: Number(r.processing_efficiency),
                                quality: Number(r.quality),
                            }); })];
                    case 2:
                        error_4 = _a.sent();
                        console.log(error_4);
                        throwError('RESOURCE_EFFICIENCY_FAILED', 500);
                        return [2];
                    case 3: return [2];
                }
            });
        });
    };
    ResourceMonitoringService.prototype.forecasting = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var days, rows, energyAvg_1, effAvg_1, forecast, error_5;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        days = (_a = params.days_ahead) !== null && _a !== void 0 ? _a : 7;
                        return [4, this.db
                                .select({
                                date: schema.dailyMetrics.metric_date,
                                efficiency: schema.dailyMetrics.processing_efficiency,
                                energy: schema.dailyMetrics.energy_consumed_kwh,
                            })
                                .from(schema.dailyMetrics)
                                .orderBy(desc(schema.dailyMetrics.metric_date))
                                .limit(30)];
                    case 1:
                        rows = _b.sent();
                        energyAvg_1 = rows.length ? rows.reduce(function (s, r) { return s + Number(r.energy); }, 0) / rows.length : 0;
                        effAvg_1 = rows.length ? rows.reduce(function (s, r) { return s + Number(r.efficiency); }, 0) / rows.length : 0;
                        forecast = Array.from({ length: days }).map(function (_, i) { return ({
                            date: new Date(Date.now() + (i + 1) * 24 * 3600 * 1000),
                            energy_consumed_kwh: energyAvg_1,
                            processing_efficiency: effAvg_1,
                        }); });
                        return [2, {
                                based_on_days: rows.length,
                                forecast: forecast,
                            }];
                    case 2:
                        error_5 = _b.sent();
                        console.log(error_5);
                        throwError('RESOURCE_FORECASTING_FAILED', 500);
                        return [2];
                    case 3: return [2];
                }
            });
        });
    };
    ResourceMonitoringService.prototype.buildUsageFilters = function (filters) {
        var conds = [];
        if (filters.resource_type)
            conds.push(eq(schema.resourceUsage.resource_type, filters.resource_type));
        if (filters.module_id)
            conds.push(eq(schema.resourceUsage.module_id, filters.module_id));
        if (filters.processing_run_id)
            conds.push(eq(schema.resourceUsage.processing_run_id, filters.processing_run_id));
        if (filters.start_date)
            conds.push(gte(schema.resourceUsage.usage_date, new Date(filters.start_date)));
        if (filters.end_date)
            conds.push(lte(schema.resourceUsage.usage_date, new Date(filters.end_date)));
        if (conds.length === 0)
            return sql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["1=1"], ["1=1"])));
        var where = conds[0];
        for (var i = 1; i < conds.length; i++)
            where = and(where, conds[i]);
        return where;
    };
    ResourceMonitoringService.prototype.buildDailyFilters = function (params) {
        var conds = [];
        if (params.start_date)
            conds.push(gte(schema.dailyMetrics.metric_date, new Date(params.start_date)));
        if (params.end_date)
            conds.push(lte(schema.dailyMetrics.metric_date, new Date(params.end_date)));
        if (conds.length === 0)
            return sql(templateObject_2 || (templateObject_2 = __makeTemplateObject(["1=1"], ["1=1"])));
        var where = conds[0];
        for (var i = 1; i < conds.length; i++)
            where = and(where, conds[i]);
        return where;
    };
    ResourceMonitoringService.prototype.formatUsage = function (i) {
        return __assign(__assign({}, i), { cost_estimate: i.cost_estimate != null ? Number(i.cost_estimate) : null, quantity_used: Number(i.quantity_used) });
    };
    ResourceMonitoringService = __decorate([
        Injectable(),
        __param(0, Inject(DrizzleAsyncProvider)),
        __metadata("design:paramtypes", [Function])
    ], ResourceMonitoringService);
    return ResourceMonitoringService;
}());
export { ResourceMonitoringService };
var templateObject_1, templateObject_2;
//# sourceMappingURL=resource_monitoring.service.js.map