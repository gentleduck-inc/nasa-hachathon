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
import { and, count, desc, eq, gte, lte, sql } from 'drizzle-orm';
import { throwError } from '~/common/libs';
import { DrizzleAsyncProvider, schema } from '~/drizzle';
var ProcessingRunsService = (function () {
    function ProcessingRunsService(db) {
        this.db = db;
    }
    ProcessingRunsService.prototype.createRun = function (input) {
        return __awaiter(this, void 0, void 0, function () {
            var recipe, module_1, inputKeys, total, row, error_1;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 6, , 7]);
                        if (!input.idempotencyKey) {
                            throwError('RUN_IDEMPOTENCY_KEY_REQUIRED', 400);
                            return [2];
                        }
                        return [4, this.db.query.processingRecipes.findFirst({
                                where: eq(schema.processingRecipes.id, input.recipe_id),
                            })];
                    case 1:
                        recipe = _c.sent();
                        if (!recipe) {
                            throwError('RUN_CREATE_FAILED', 400);
                            return [2];
                        }
                        if (!input.module_id) return [3, 3];
                        return [4, this.db.query.processingModules.findFirst({
                                where: eq(schema.processingModules.id, input.module_id),
                            })];
                    case 2:
                        module_1 = _c.sent();
                        if (!module_1) {
                            throwError('RUN_CREATE_FAILED', 400);
                            return [2];
                        }
                        _c.label = 3;
                    case 3:
                        inputKeys = Object.keys(input.input_quantities || {});
                        if (!inputKeys.length) {
                            throwError('RUN_CREATE_FAILED', 400);
                            return [2];
                        }
                        return [4, this.db
                                .select({ total: count() })
                                .from(schema.processingRuns)
                                .where(eq(schema.processingRuns.name, input.name))];
                    case 4:
                        total = (_c.sent())[0].total;
                        if (total > 0) {
                        }
                        return [4, this.db
                                .insert(schema.processingRuns)
                                .values({
                                created_at: new Date(),
                                estimated_outputs: (_a = input.estimated_outputs) !== null && _a !== void 0 ? _a : {},
                                input_quantities: input.input_quantities,
                                module_id: (_b = input.module_id) !== null && _b !== void 0 ? _b : null,
                                name: input.name,
                                progress_percent: 0,
                                recipe_id: input.recipe_id,
                                status: 'queued',
                            })
                                .returning()];
                    case 5:
                        row = (_c.sent())[0];
                        if (!row) {
                            throwError('RUN_CREATE_FAILED', 500);
                            return [2];
                        }
                        return [2, row];
                    case 6:
                        error_1 = _c.sent();
                        console.log(error_1);
                        throwError('RUN_CREATE_FAILED', 500);
                        return [2];
                    case 7: return [2];
                }
            });
        });
    };
    ProcessingRunsService.prototype.listRuns = function (filters) {
        return __awaiter(this, void 0, void 0, function () {
            var page, limit, offset, where, total, items, total_pages, error_2;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 3, , 4]);
                        page = (_a = filters.page) !== null && _a !== void 0 ? _a : 1;
                        limit = (_b = filters.limit) !== null && _b !== void 0 ? _b : 20;
                        offset = (page - 1) * limit;
                        where = this.buildFilters(filters);
                        return [4, this.db.select({ total: count() }).from(schema.processingRuns).where(where)];
                    case 1:
                        total = (_c.sent())[0].total;
                        return [4, this.db
                                .select()
                                .from(schema.processingRuns)
                                .where(where)
                                .orderBy(desc(schema.processingRuns.created_at))
                                .limit(limit)
                                .offset(offset)];
                    case 2:
                        items = _c.sent();
                        total_pages = Math.ceil(total / limit);
                        return [2, {
                                items: items,
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
                        error_2 = _c.sent();
                        console.log(error_2);
                        throwError('RUN_LIST_FETCH_FAILED', 500);
                        return [2];
                    case 4: return [2];
                }
            });
        });
    };
    ProcessingRunsService.prototype.getRunById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var run, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, this.db.query.processingRuns.findFirst({ where: eq(schema.processingRuns.id, id) })];
                    case 1:
                        run = _a.sent();
                        if (!run) {
                            throwError('RUN_NOT_FOUND', 404);
                            return [2];
                        }
                        return [2, __assign(__assign({}, run), { logs: [], steps: [] })];
                    case 2:
                        error_3 = _a.sent();
                        console.log(error_3);
                        throwError('RUN_FETCH_FAILED', 500);
                        return [2];
                    case 3: return [2];
                }
            });
        });
    };
    ProcessingRunsService.prototype.cancelRun = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var current, row, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4, this.db.query.processingRuns.findFirst({ where: eq(schema.processingRuns.id, id) })];
                    case 1:
                        current = _a.sent();
                        if (!current) {
                            throwError('RUN_NOT_FOUND', 404);
                            return [2];
                        }
                        if (!['queued', 'running'].includes(current.status)) {
                            throwError('RUN_INVALID_STATUS', 400);
                            return [2];
                        }
                        return [4, this.db
                                .update(schema.processingRuns)
                                .set({
                                completed_at: new Date(),
                                error_message: 'Run cancelled by operator',
                                status: 'failed',
                                updated_at: new Date(),
                            })
                                .where(eq(schema.processingRuns.id, id))
                                .returning()];
                    case 2:
                        row = (_a.sent())[0];
                        return [2, row];
                    case 3:
                        error_4 = _a.sent();
                        console.log(error_4);
                        throwError('RUN_CANCEL_FAILED', 500);
                        return [2];
                    case 4: return [2];
                }
            });
        });
    };
    ProcessingRunsService.prototype.retryRun = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var current, row, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4, this.db.query.processingRuns.findFirst({ where: eq(schema.processingRuns.id, id) })];
                    case 1:
                        current = _a.sent();
                        if (!current) {
                            throwError('RUN_NOT_FOUND', 404);
                            return [2];
                        }
                        if (current.status !== 'failed') {
                            throwError('RUN_INVALID_STATUS', 400);
                            return [2];
                        }
                        return [4, this.db
                                .update(schema.processingRuns)
                                .set({
                                completed_at: null,
                                error_message: null,
                                progress_percent: 0,
                                started_at: null,
                                status: 'queued',
                                updated_at: new Date(),
                            })
                                .where(eq(schema.processingRuns.id, id))
                                .returning()];
                    case 2:
                        row = (_a.sent())[0];
                        return [2, row];
                    case 3:
                        error_5 = _a.sent();
                        console.log(error_5);
                        throwError('RUN_RETRY_FAILED', 500);
                        return [2];
                    case 4: return [2];
                }
            });
        });
    };
    ProcessingRunsService.prototype.getLogs = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var exists, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, this.db.query.processingRuns.findFirst({ where: eq(schema.processingRuns.id, id) })];
                    case 1:
                        exists = _a.sent();
                        if (!exists) {
                            throwError('RUN_NOT_FOUND', 404);
                            return [2];
                        }
                        return [2, []];
                    case 2:
                        error_6 = _a.sent();
                        console.log(error_6);
                        throwError('RUN_LOGS_FETCH_FAILED', 500);
                        return [2];
                    case 3: return [2];
                }
            });
        });
    };
    ProcessingRunsService.prototype.buildFilters = function (filters) {
        var parts = [];
        if (filters.status)
            parts.push(eq(schema.processingRuns.status, filters.status));
        if (filters.module_id)
            parts.push(eq(schema.processingRuns.module_id, filters.module_id));
        if (filters.recipe_id)
            parts.push(eq(schema.processingRuns.recipe_id, filters.recipe_id));
        if (filters.date_from)
            parts.push(gte(schema.processingRuns.created_at, new Date(filters.date_from)));
        if (filters.date_to)
            parts.push(lte(schema.processingRuns.created_at, new Date(filters.date_to)));
        var condition = sql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["1=1"], ["1=1"])));
        for (var _i = 0, parts_1 = parts; _i < parts_1.length; _i++) {
            var p = parts_1[_i];
            condition = and(condition, p);
        }
        return condition;
    };
    ProcessingRunsService = __decorate([
        Injectable(),
        __param(0, Inject(DrizzleAsyncProvider)),
        __metadata("design:paramtypes", [Function])
    ], ProcessingRunsService);
    return ProcessingRunsService;
}());
export { ProcessingRunsService };
var templateObject_1;
//# sourceMappingURL=processing_runs.service.js.map