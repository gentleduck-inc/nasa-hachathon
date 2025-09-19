"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ChatsService", {
    enumerable: true,
    get: function() {
        return ChatsService;
    }
});
const _common = require("@nestjs/common");
const _drizzleorm = require("drizzle-orm");
const _nodepostgres = require("drizzle-orm/node-postgres");
const _libs = require("../common/libs");
const _drizzle = require("../drizzle");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
function _ts_param(paramIndex, decorator) {
    return function(target, key) {
        decorator(target, key, paramIndex);
    };
}
let ChatsService = class ChatsService {
    async create(data) {
        try {
            const chat = await this.db.insert(_drizzle.schema.messageTable).values({
                ...data
            }).returning();
            if (!chat.length) {
                return (0, _libs.throwError)('CHAT_FAILED_TO_CREATE');
            }
            return chat;
        } catch (error) {
            console.log(error);
            return (0, _libs.throwError)('CHAT_FAILED_TO_CREATE');
        }
    }
    async update(data) {
        try {
            const chat = await this.db.update(_drizzle.schema.messageTable).set({
                ...data
            }).where((0, _drizzleorm.eq)(_drizzle.schema.messageTable.id, data.id)).returning();
            if (!chat.length) {
                return (0, _libs.throwError)('CHAT_NOT_FOUND_OR_UPDATE_FAILED');
            }
            return chat;
        } catch (error) {
            return (0, _libs.throwError)('CHAT_FAILED_TO_UPDATE');
        }
    }
    async delete(data) {
        try {
            const chat = await this.db.delete(_drizzle.schema.messageTable).where((0, _drizzleorm.eq)(_drizzle.schema.messageTable.id, data.id)).returning();
            if (!chat.length) {
                return (0, _libs.throwError)('CHAT_NOT_FOUND_OR_DELETE_FAILED');
            }
            return chat;
        } catch (error) {
            return (0, _libs.throwError)('CHAT_FAILED_TO_DELETE');
        }
    }
    async getHistory(data) {
        try {
            const messages = await this.db.select({
                id: _drizzle.schema.messageTable.id,
                content: _drizzle.schema.messageTable.content,
                createdAt: _drizzle.schema.messageTable.createdAt,
                userId: _drizzle.schema.messageTable.userId,
                name: _drizzle.schema.userTable.name
            }).from(_drizzle.schema.messageTable).where((0, _drizzleorm.eq)(_drizzle.schema.messageTable.chatId, data.chatId)).orderBy((0, _drizzleorm.desc)(_drizzle.schema.messageTable.createdAt)).limit(data.limit).offset(data.cursor).innerJoin(_drizzle.schema.userTable, (0, _drizzleorm.eq)(_drizzle.schema.messageTable.userId, _drizzle.schema.userTable.id));
            return messages;
        } catch (error) {
            return (0, _libs.throwError)('CHAT_HISTORY_FETCH_FAILED');
        }
    }
    constructor(db){
        this.db = db;
    }
};
ChatsService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(0, (0, _common.Inject)(_drizzle.DrizzleAsyncProvider)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _nodepostgres.NodePgDatabase === "undefined" ? Object : _nodepostgres.NodePgDatabase
    ])
], ChatsService);

//# sourceMappingURL=chats.service.js.map