"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ChatsModule", {
    enumerable: true,
    get: function() {
        return ChatsModule;
    }
});
const _common = require("@nestjs/common");
const _ai = require("../ai");
const _chatscontroller = require("./chats.controller");
const _chatsgateway = require("./chats.gateway");
const _chatsservice = require("./chats.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let ChatsModule = class ChatsModule {
};
ChatsModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _ai.AiModule
        ],
        controllers: [
            _chatscontroller.ChatsController
        ],
        providers: [
            _chatsgateway.ChatsGateway,
            _chatsservice.ChatsService,
            _ai.AIService
        ]
    })
], ChatsModule);

//# sourceMappingURL=chats.module.js.map