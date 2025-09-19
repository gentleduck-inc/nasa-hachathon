"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: Object.getOwnPropertyDescriptor(all, name).get
    });
}
_export(exports, {
    get connectChatQuerySchema () {
        return connectChatQuerySchema;
    },
    get getChatHistorySchema () {
        return getChatHistorySchema;
    },
    get messageCreateSchema () {
        return messageCreateSchema;
    },
    get messageDeleteSchema () {
        return messageDeleteSchema;
    },
    get messageUpdateSchema () {
        return messageUpdateSchema;
    }
});
const _zod = /*#__PURE__*/ _interop_require_default(require("zod"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const errorMessage = (message)=>({
        message
    });
const connectChatQuerySchema = _zod.default.object({
    chatId: _zod.default.string({
        ...errorMessage('ZOD_EXPECTED_STRING')
    }),
    userId: _zod.default.string({
        ...errorMessage('ZOD_EXPECTED_STRING')
    })
});
const messageCreateSchema = _zod.default.object({
    type: _zod.default.string({
        ...errorMessage('ZOD_EXPECTED_STRING')
    }),
    content: _zod.default.string({
        ...errorMessage('ZOD_EXPECTED_STRING')
    }),
    metadata: _zod.default.object({
        model: _zod.default.string({
            ...errorMessage('ZOD_EXPECTED_STRING')
        })
    }),
    userId: _zod.default.string({
        ...errorMessage('ZOD_EXPECTED_STRING')
    }).uuid({
        ...errorMessage('ZOD_INVALID')
    }),
    chatId: _zod.default.string({
        ...errorMessage('ZOD_EXPECTED_STRING')
    }).uuid({
        ...errorMessage('ZOD_INVALID')
    }),
    modelId: _zod.default.string({
        ...errorMessage('ZOD_EXPECTED_STRING')
    }).uuid({
        ...errorMessage('ZOD_INVALID')
    })
});
const messageUpdateSchema = messageCreateSchema.extend({
    id: _zod.default.string({
        ...errorMessage('ZOD_EXPECTED_STRING')
    }).uuid({
        ...errorMessage('ZOD_INVALID')
    })
});
const messageDeleteSchema = _zod.default.object({
    id: _zod.default.string({
        ...errorMessage('ZOD_EXPECTED_STRING')
    }).uuid({
        ...errorMessage('ZOD_INVALID')
    })
});
const getChatHistorySchema = _zod.default.object({
    chatId: _zod.default.string(),
    cursor: _zod.default.number().min(0).default(0),
    limit: _zod.default.number().min(1).max(100).default(20)
});

//# sourceMappingURL=chats.dto.js.map