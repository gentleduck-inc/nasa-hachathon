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
    get AIService () {
        return AIService;
    },
    get AIServiceAbstract () {
        return AIServiceAbstract;
    }
});
const _common = require("@nestjs/common");
const _services = require("./services");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let AIServiceAbstract = class AIServiceAbstract {
};
AIServiceAbstract = _ts_decorate([
    (0, _common.Injectable)()
], AIServiceAbstract);
let AIService = class AIService {
    getService(type) {
        switch(type){
            case 'chatGPT':
                return this.chatGPT_gemini;
            default:
                throw new Error('Invalid service type');
        }
    }
    constructor(chatGPT_gemini){
        this.chatGPT_gemini = chatGPT_gemini;
    }
};
AIService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _services.ChatGPTGeminiService === "undefined" ? Object : _services.ChatGPTGeminiService
    ])
], AIService);

//# sourceMappingURL=ai.service.js.map