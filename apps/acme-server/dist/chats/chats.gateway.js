"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ChatsGateway", {
    enumerable: true,
    get: function() {
        return ChatsGateway;
    }
});
const _common = require("@nestjs/common");
const _websockets = require("@nestjs/websockets");
const _socketio = require("socket.io");
const _zod = require("zod");
const _exceptions = require("../common/exceptions");
const _libs = require("../common/libs");
const _pipes = require("../common/pipes");
const _chatsdto = require("./chats.dto");
const _chatsservice = require("./chats.service");
const _ai = require("../ai");
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
let ChatsGateway = class ChatsGateway {
    async afterInit(server) {
        this.server = server;
        console.log('✅ WebSocket server initialized');
    }
    handleConnection(client) {
        // console.log(client.handshake)
        // if (!client.handshake.session.user) {
        //   return throwWSError<ChatsErrorType>('SOCKET_UNAUTHORIZED')
        // }
        try {
            const data = _chatsdto.connectChatQuerySchema.parse(client.handshake.query);
            client.join(data.chatId);
            this.userSockets.set(client.id, {
                userId: data.userId,
                chatId: data.chatId
            });
            console.log(`✅ ${data.userId} joined room ${data.chatId}`);
        } catch (error) {
            if (error instanceof _zod.ZodError) {
                return (0, _libs.throwWSError)('SOCKET_QUERY_PARSING_ERROR');
            }
            return (0, _libs.throwWSError)('SOCKET_CONNECTION_ERROR');
        }
    }
    handleDisconnect(client) {
        const meta = this.userSockets.get(client.id);
        if (meta) {
            console.log(`❌ ${meta.userId} disconnected from room ${meta.chatId}`);
        } else {
            console.log(`❌ Unknown client ${client.id} disconnected`);
        }
        this.userSockets.delete(client.id);
    }
    async handleMessage(client, payload) {
        const meta = this.userSockets.get(client.id);
        if (!meta) {
            throw (0, _libs.throwWSError)('SOCKET_AUTHENTICATION_ERROR');
        }
        const message = await this.chatsService.create(payload);
        const { chatId, userId } = meta;
        client.to(chatId).emit('message', message);
        console.log(`📩 ${userId} sent: "${payload.content}" in room ${chatId}`);
        const model = this.aiService.getService('chatGPT');
        const hay = await model.getAnswerStream('tell me about love', 'gemini-2.0-flash', (chunk)=>{
            console.log(chunk);
        });
    }
    async handleHistory(payload, client) {
        console.log('getting history');
        const chatHistory = await this.chatsService.getHistory({
            chatId: payload.chatId,
            cursor: 0,
            limit: 50
        });
        client.emit('history', chatHistory);
    }
    constructor(chatsService, aiService){
        this.chatsService = chatsService;
        this.aiService = aiService;
        this.userSockets = new Map();
    }
} /**
 * -[x] HANDLE CONNECTION
 * -[x] HANDLE AUTH
 * -[x] HANDLE ROOMS
 * -[x] HANDLE MESSAGES
 * -[x] HANDLE USERS
 * -[ ] HANDLE ATTACHMENTS
 * -[ ] HANDLE MESSAGE DELIVERY
 * -[ ] HANDLE AI MESSAGES
 */ ;
_ts_decorate([
    (0, _websockets.WebSocketServer)(),
    _ts_metadata("design:type", Object)
], ChatsGateway.prototype, "server", void 0);
_ts_decorate([
    (0, _common.UseFilters)(new _exceptions.WSErrorExceptionFilter()),
    _ts_param(0, (0, _websockets.ConnectedSocket)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Object
    ]),
    _ts_metadata("design:returntype", void 0)
], ChatsGateway.prototype, "handleConnection", null);
_ts_decorate([
    _ts_param(0, (0, _websockets.ConnectedSocket)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _socketio.Socket === "undefined" ? Object : _socketio.Socket
    ]),
    _ts_metadata("design:returntype", void 0)
], ChatsGateway.prototype, "handleDisconnect", null);
_ts_decorate([
    (0, _websockets.SubscribeMessage)('message'),
    _ts_param(0, (0, _websockets.ConnectedSocket)()),
    _ts_param(1, (0, _websockets.MessageBody)(new _pipes.ZodValidationPipe(_chatsdto.messageCreateSchema))),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _socketio.Socket === "undefined" ? Object : _socketio.Socket,
        typeof _chatsdto.MessageCreateSchema === "undefined" ? Object : _chatsdto.MessageCreateSchema
    ]),
    _ts_metadata("design:returntype", Promise)
], ChatsGateway.prototype, "handleMessage", null);
_ts_decorate([
    (0, _websockets.SubscribeMessage)('history'),
    _ts_param(0, (0, _websockets.MessageBody)()),
    _ts_param(1, (0, _websockets.ConnectedSocket)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Object,
        typeof _socketio.Socket === "undefined" ? Object : _socketio.Socket
    ]),
    _ts_metadata("design:returntype", Promise)
], ChatsGateway.prototype, "handleHistory", null);
ChatsGateway = _ts_decorate([
    (0, _websockets.WebSocketGateway)({
        cors: {
            origin: '*',
            credentials: true
        },
        namespace: '/'
    }),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _chatsservice.ChatsService === "undefined" ? Object : _chatsservice.ChatsService,
        typeof _ai.AIService === "undefined" ? Object : _ai.AIService
    ])
], ChatsGateway);

//# sourceMappingURL=chats.gateway.js.map