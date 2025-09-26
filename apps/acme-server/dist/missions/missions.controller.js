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
import { Body, Controller, Delete, Get, Param, Patch, Post, Request, UseFilters } from '@nestjs/common';
import { ErrorExceptionFilter } from '~/common/exceptions';
import { ZodValidationPipe } from '~/common/pipes';
import { assignCrewSchema, createMissionSchema, updateMissionSchema, updateMissionStatusSchema } from './missions.dto';
import { MissionsService } from './missions.service';
import { AssignCrewDto, CreateMissionDto, UpdateMissionDto, UpdateMissionStatusDto } from './missions.types';
var MissionsController = (function () {
    function MissionsController(missionsService) {
        this.missionsService = missionsService;
    }
    MissionsController.prototype.createMission = function (body, req) {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.missionsService.createMission(body, req.user.id)];
                    case 1:
                        data = _a.sent();
                        return [2, { data: data, message: 'MISSION_CREATED_SUCCESS', state: 'success' }];
                }
            });
        });
    };
    MissionsController.prototype.getMissions = function () {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.missionsService.getMissions()];
                    case 1:
                        data = _a.sent();
                        return [2, { data: data, message: 'MISSION_FETCH_SUCCESS', state: 'success' }];
                }
            });
        });
    };
    MissionsController.prototype.getMissionById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.missionsService.getMissionById(id)];
                    case 1:
                        data = _a.sent();
                        return [2, { data: data, message: 'MISSION_FETCH_SUCCESS', state: 'success' }];
                }
            });
        });
    };
    MissionsController.prototype.updateMission = function (id, body) {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.missionsService.updateMission(__assign(__assign({}, body), { id: id }))];
                    case 1:
                        data = _a.sent();
                        return [2, { data: data, message: 'MISSION_UPDATED_SUCCESS', state: 'success' }];
                }
            });
        });
    };
    MissionsController.prototype.deleteMission = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.missionsService.deleteMission(id)];
                    case 1:
                        data = _a.sent();
                        return [2, { data: data, message: 'MISSION_DELETED_SUCCESS', state: 'success' }];
                }
            });
        });
    };
    MissionsController.prototype.updateMissionStatus = function (id, body) {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.missionsService.updateMissionStatus(id, body)];
                    case 1:
                        data = _a.sent();
                        return [2, { data: data, message: 'MISSION_STATUS_UPDATED_SUCCESS', state: 'success' }];
                }
            });
        });
    };
    MissionsController.prototype.assignCrew = function (missionId, body) {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.missionsService.assignCrew(missionId, body)];
                    case 1:
                        data = _a.sent();
                        return [2, { data: data, message: 'MISSION_CREW_ASSIGNED_SUCCESS', state: 'success' }];
                }
            });
        });
    };
    MissionsController.prototype.removeCrew = function (missionId, userId) {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.missionsService.removeCrew(missionId, userId)];
                    case 1:
                        data = _a.sent();
                        return [2, { data: data, message: 'MISSION_CREW_REMOVED_SUCCESS', state: 'success' }];
                }
            });
        });
    };
    MissionsController.prototype.getMissionStatistics = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.missionsService.getMissionStatistics(id)];
                    case 1:
                        data = _a.sent();
                        return [2, { data: data, message: 'MISSION_STATISTICS_FETCH_SUCCESS', state: 'success' }];
                }
            });
        });
    };
    MissionsController.prototype.getMissionTimeline = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.missionsService.getMissionTimeline(id)];
                    case 1:
                        data = _a.sent();
                        return [2, { data: data, message: 'MISSION_TIMELINE_FETCH_SUCCESS', state: 'success' }];
                }
            });
        });
    };
    __decorate([
        Post('/'),
        __param(0, Body(new ZodValidationPipe(createMissionSchema))),
        __param(1, Request()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [CreateMissionDto, Object]),
        __metadata("design:returntype", Promise)
    ], MissionsController.prototype, "createMission", null);
    __decorate([
        Get('/'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Promise)
    ], MissionsController.prototype, "getMissions", null);
    __decorate([
        Get(':id'),
        __param(0, Param('id')),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", Promise)
    ], MissionsController.prototype, "getMissionById", null);
    __decorate([
        Patch(':id'),
        __param(0, Param('id')),
        __param(1, Body(new ZodValidationPipe(updateMissionSchema))),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String, UpdateMissionDto]),
        __metadata("design:returntype", Promise)
    ], MissionsController.prototype, "updateMission", null);
    __decorate([
        Delete(':id'),
        __param(0, Param('id')),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", Promise)
    ], MissionsController.prototype, "deleteMission", null);
    __decorate([
        Patch(':id/status'),
        __param(0, Param('id')),
        __param(1, Body(new ZodValidationPipe(updateMissionStatusSchema))),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String, UpdateMissionStatusDto]),
        __metadata("design:returntype", Promise)
    ], MissionsController.prototype, "updateMissionStatus", null);
    __decorate([
        Post(':id/crew'),
        __param(0, Param('id')),
        __param(1, Body(new ZodValidationPipe(assignCrewSchema))),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String, AssignCrewDto]),
        __metadata("design:returntype", Promise)
    ], MissionsController.prototype, "assignCrew", null);
    __decorate([
        Delete(':id/crew/:userId'),
        __param(0, Param('id')),
        __param(1, Param('userId')),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String, String]),
        __metadata("design:returntype", Promise)
    ], MissionsController.prototype, "removeCrew", null);
    __decorate([
        Get(':id/statistics'),
        __param(0, Param('id')),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", Promise)
    ], MissionsController.prototype, "getMissionStatistics", null);
    __decorate([
        Get(':id/timeline'),
        __param(0, Param('id')),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", Promise)
    ], MissionsController.prototype, "getMissionTimeline", null);
    MissionsController = __decorate([
        Controller('missions'),
        UseFilters(ErrorExceptionFilter),
        __metadata("design:paramtypes", [MissionsService])
    ], MissionsController);
    return MissionsController;
}());
export { MissionsController };
//# sourceMappingURL=missions.controller.js.map