"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ChatsError", {
    enumerable: true,
    get: function() {
        return ChatsError;
    }
});
const _constants = require("../common/constants");
const ChatsError = [
    // Chat
    'CHAT_FAILED_TO_CREATE',
    'CHAT_FAILED_TO_FETCH',
    'CHAT_FAILED_TO_UPDATE',
    'CHAT_FAILED_TO_DELETE',
    'CHAT_NOT_FOUND_OR_UPDATE_FAILED',
    'CHAT_NOT_FOUND_OR_DELETE_FAILED',
    'CHAT_HISTORY_FETCH_FAILED',
    // Socket
    'SOCKET_CONNECTION_ERROR',
    'SOCKET_DISCONNECTION_ERROR',
    'SOCKET_MESSAGE_ERROR',
    'SOCKET_QUERY_PARSING_ERROR',
    'SOCKET_AUTHENTICATION_ERROR',
    'SOCKET_UNAUTHORIZED',
    // Zod
    ..._constants.ZodError
];

//# sourceMappingURL=chats.constants.js.map