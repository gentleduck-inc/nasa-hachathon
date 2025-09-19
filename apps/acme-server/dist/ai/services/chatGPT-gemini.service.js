"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ChatGPTGeminiService", {
    enumerable: true,
    get: function() {
        return ChatGPTGeminiService;
    }
});
const _common = require("@nestjs/common");
const _config = require("@nestjs/config");
const _openai = /*#__PURE__*/ _interop_require_default(require("openai"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let ChatGPTGeminiService = class ChatGPTGeminiService {
    async initiateAccess() {
        try {
            await this.client.models.list();
            console.log('✅ OpenAI API initialized.');
        } catch (err) {
            console.error('❌ OpenAI init failed:', err);
        }
    }
    async getAnswerStream(message, model, cb) {
        try {
            if (model.includes('gemini')) {
                console.log('using gemini api');
                this.client.apiKey = 'AIzaSyA4_a_yqkLPb0ofQwDY8aMJeUQA7USHLrc';
                this.client.baseURL = 'https://generativelanguage.googleapis.com/v1beta/openai/';
            }
            const completion = await this.client.chat.completions.create({
                model,
                messages: [
                    {
                        role: 'user',
                        content: message
                    }
                ],
                stream: true
            });
            for await (const chunk of completion){
                cb(chunk.choices[0].delta.content);
            }
        } catch (error) {
            console.log('error', error);
            throw error;
        }
    }
    constructor(config){
        this.config = config;
        this.client = new _openai.default({
            apiKey: this.config.get('OPENAI_API_KEY')
        });
    }
};
ChatGPTGeminiService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _config.ConfigService === "undefined" ? Object : _config.ConfigService
    ])
], ChatGPTGeminiService);

//# sourceMappingURL=chatGPT-gemini.service.js.map