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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { Inject, Injectable } from '@nestjs/common';
import { and, eq, isNull, sql } from 'drizzle-orm';
import { throwError } from '~/common/libs';
import { DrizzleAsyncProvider, schema } from '~/drizzle';
var MissionsService = (function () {
    function MissionsService(db) {
        this.db = db;
    }
    MissionsService.prototype.createMission = function (data, createdBy) {
        return __awaiter(this, void 0, void 0, function () {
            var mission, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, this.db
                                .insert(schema.missions)
                                .values(__assign(__assign({}, data), { created_by: createdBy, landing_date: data.landing_date ? new Date(data.landing_date) : null, launch_date: data.launch_date ? new Date(data.launch_date) : null, return_date: data.return_date ? new Date(data.return_date) : null }))
                                .returning()];
                    case 1:
                        mission = _a.sent();
                        if (!(mission === null || mission === void 0 ? void 0 : mission.length)) {
                            throwError('MISSION_CREATION_FAILED', 500);
                            return [2];
                        }
                        return [2, mission[0]];
                    case 2:
                        error_1 = _a.sent();
                        console.log(error_1);
                        throwError('MISSION_CREATION_FAILED', 500);
                        return [2];
                    case 3: return [2];
                }
            });
        });
    };
    MissionsService.prototype.getMissions = function () {
        return __awaiter(this, void 0, void 0, function () {
            var error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, this.db.query.missions.findMany({
                                orderBy: [schema.missions.created_at],
                                where: isNull(schema.missions.deleted_at),
                                with: {
                                    createdBy: {
                                        columns: {
                                            email: true,
                                            first_name: true,
                                            id: true,
                                            last_name: true,
                                        },
                                    },
                                    crew: {
                                        where: isNull(schema.missionCrew.removed_at),
                                        with: {
                                            user: {
                                                columns: {
                                                    email: true,
                                                    first_name: true,
                                                    id: true,
                                                    last_name: true,
                                                    role: true,
                                                },
                                            },
                                        },
                                    },
                                },
                            })];
                    case 1: return [2, _a.sent()];
                    case 2:
                        error_2 = _a.sent();
                        console.log(error_2);
                        throwError('MISSION_FETCH_FAILED', 500);
                        return [2];
                    case 3: return [2];
                }
            });
        });
    };
    MissionsService.prototype.getMissionById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var mission, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, this.db.query.missions.findFirst({
                                where: and(eq(schema.missions.id, id), isNull(schema.missions.deleted_at)),
                                with: {
                                    createdBy: {
                                        columns: {
                                            email: true,
                                            first_name: true,
                                            id: true,
                                            last_name: true,
                                        },
                                    },
                                    crew: {
                                        where: isNull(schema.missionCrew.removed_at),
                                        with: {
                                            user: {
                                                columns: {
                                                    email: true,
                                                    first_name: true,
                                                    id: true,
                                                    last_name: true,
                                                    role: true,
                                                },
                                            },
                                        },
                                    },
                                },
                            })];
                    case 1:
                        mission = _a.sent();
                        if (!mission) {
                            throwError('MISSION_NOT_FOUND', 404);
                            return [2];
                        }
                        return [2, mission];
                    case 2:
                        error_3 = _a.sent();
                        console.log(error_3);
                        throwError('MISSION_FETCH_FAILED', 500);
                        return [2];
                    case 3: return [2];
                }
            });
        });
    };
    MissionsService.prototype.updateMission = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var id, updateData, mission, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        id = data.id, updateData = __rest(data, ["id"]);
                        return [4, this.db
                                .update(schema.missions)
                                .set(__assign(__assign({}, updateData), { landing_date: updateData.landing_date ? new Date(updateData.landing_date) : undefined, launch_date: updateData.launch_date ? new Date(updateData.launch_date) : undefined, return_date: updateData.return_date ? new Date(updateData.return_date) : undefined, updated_at: new Date(), version: sql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["", " + 1"], ["", " + 1"])), schema.missions.version) }))
                                .where(eq(schema.missions.id, id))
                                .returning()];
                    case 1:
                        mission = _a.sent();
                        if (!(mission === null || mission === void 0 ? void 0 : mission.length)) {
                            throwError('MISSION_UPDATE_FAILED', 500);
                            return [2];
                        }
                        return [2, mission[0]];
                    case 2:
                        error_4 = _a.sent();
                        console.log(error_4);
                        throwError('MISSION_UPDATE_FAILED', 500);
                        return [2];
                    case 3: return [2];
                }
            });
        });
    };
    MissionsService.prototype.deleteMission = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var mission, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, this.db
                                .update(schema.missions)
                                .set({
                                deleted_at: new Date(),
                                updated_at: new Date(),
                            })
                                .where(eq(schema.missions.id, id))
                                .returning({ id: schema.missions.id })];
                    case 1:
                        mission = _a.sent();
                        if (!(mission === null || mission === void 0 ? void 0 : mission.length)) {
                            throwError('MISSION_DELETE_FAILED', 500);
                            return [2];
                        }
                        return [2, mission[0]];
                    case 2:
                        error_5 = _a.sent();
                        console.log(error_5);
                        throwError('MISSION_DELETE_FAILED', 500);
                        return [2];
                    case 3: return [2];
                }
            });
        });
    };
    MissionsService.prototype.updateMissionStatus = function (id, data) {
        return __awaiter(this, void 0, void 0, function () {
            var mission, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, this.db
                                .update(schema.missions)
                                .set({
                                status: data.status,
                                updated_at: new Date(),
                                version: sql(templateObject_2 || (templateObject_2 = __makeTemplateObject(["", " + 1"], ["", " + 1"])), schema.missions.version),
                            })
                                .where(eq(schema.missions.id, id))
                                .returning()];
                    case 1:
                        mission = _a.sent();
                        if (!(mission === null || mission === void 0 ? void 0 : mission.length)) {
                            throwError('MISSION_STATUS_UPDATE_FAILED', 500);
                            return [2];
                        }
                        return [2, mission[0]];
                    case 2:
                        error_6 = _a.sent();
                        console.log(error_6);
                        throwError('MISSION_STATUS_UPDATE_FAILED', 500);
                        return [2];
                    case 3: return [2];
                }
            });
        });
    };
    MissionsService.prototype.assignCrew = function (missionId, data) {
        return __awaiter(this, void 0, void 0, function () {
            var existingAssignment, assignment, error_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4, this.db.query.missionCrew.findFirst({
                                where: and(eq(schema.missionCrew.mission_id, missionId), eq(schema.missionCrew.user_id, data.user_id), isNull(schema.missionCrew.removed_at)),
                            })];
                    case 1:
                        existingAssignment = _a.sent();
                        if (existingAssignment) {
                            throwError('MISSION_CREW_ALREADY_ASSIGNED', 400);
                            return [2];
                        }
                        return [4, this.db
                                .insert(schema.missionCrew)
                                .values({
                                mission_id: missionId,
                                role: data.role,
                                specialization: data.specialization,
                                user_id: data.user_id,
                            })
                                .returning()];
                    case 2:
                        assignment = _a.sent();
                        if (!(assignment === null || assignment === void 0 ? void 0 : assignment.length)) {
                            throwError('MISSION_CREW_ASSIGNMENT_FAILED', 500);
                            return [2];
                        }
                        return [2, assignment[0]];
                    case 3:
                        error_7 = _a.sent();
                        console.log(error_7);
                        throwError('MISSION_CREW_ASSIGNMENT_FAILED', 500);
                        return [2];
                    case 4: return [2];
                }
            });
        });
    };
    MissionsService.prototype.removeCrew = function (missionId, userId) {
        return __awaiter(this, void 0, void 0, function () {
            var assignment, error_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, this.db
                                .update(schema.missionCrew)
                                .set({
                                removed_at: new Date(),
                            })
                                .where(and(eq(schema.missionCrew.mission_id, missionId), eq(schema.missionCrew.user_id, userId), isNull(schema.missionCrew.removed_at)))
                                .returning({ id: schema.missionCrew.id })];
                    case 1:
                        assignment = _a.sent();
                        if (!(assignment === null || assignment === void 0 ? void 0 : assignment.length)) {
                            throwError('MISSION_CREW_NOT_FOUND', 404);
                            return [2];
                        }
                        return [2, assignment[0]];
                    case 2:
                        error_8 = _a.sent();
                        console.log(error_8);
                        throwError('MISSION_CREW_REMOVAL_FAILED', 500);
                        return [2];
                    case 3: return [2];
                }
            });
        });
    };
    MissionsService.prototype.getMissionStatistics = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var stats;
            return __generator(this, function (_a) {
                try {
                    stats = {
                        active_simulations: 0,
                        average_efficiency_score: 0,
                        completed_simulations: 0,
                        crew_utilization_hours: 0,
                        total_energy_consumed_kwh: 0,
                        total_products_created: 0,
                        total_simulations: 0,
                        total_waste_processed_kg: 0,
                    };
                    return [2, stats];
                }
                catch (error) {
                    console.log(error);
                    throwError('MISSION_STATISTICS_FETCH_FAILED', 500);
                    return [2];
                }
                return [2];
            });
        });
    };
    MissionsService.prototype.getMissionTimeline = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var timeline;
            return __generator(this, function (_a) {
                try {
                    timeline = {
                        events: [],
                    };
                    return [2, timeline];
                }
                catch (error) {
                    console.log(error);
                    throwError('MISSION_TIMELINE_FETCH_FAILED', 500);
                    return [2];
                }
                return [2];
            });
        });
    };
    MissionsService = __decorate([
        Injectable(),
        __param(0, Inject(DrizzleAsyncProvider)),
        __metadata("design:paramtypes", [Function])
    ], MissionsService);
    return MissionsService;
}());
export { MissionsService };
var templateObject_1, templateObject_2;
//# sourceMappingURL=missions.service.js.map