"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WaitlistModule", {
    enumerable: true,
    get: function() {
        return WaitlistModule;
    }
});
const _common = require("@nestjs/common");
const _waitlistcontroller = require("./waitlist.controller");
const _waitlistservice = require("./waitlist.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let WaitlistModule = class WaitlistModule {
};
WaitlistModule = _ts_decorate([
    (0, _common.Module)({
        imports: [],
        controllers: [
            _waitlistcontroller.WaitlistController
        ],
        providers: [
            _waitlistservice.WaitlistService
        ]
    })
], WaitlistModule);

//# sourceMappingURL=waitlist.module.js.map