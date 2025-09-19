"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WaitlistController", {
    enumerable: true,
    get: function() {
        return WaitlistController;
    }
});
const _common = require("@nestjs/common");
const _exceptions = require("../common/exceptions");
const _waitlistservice = require("./waitlist.service");
const _authdto = require("../auth/auth.dto");
const _pipes = require("../common/pipes");
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
let WaitlistController = class WaitlistController {
    // @Get()
    // async getWishlist() {
    //   return await this.wishlistService.getWishlist()
    // }
    async addToWishlist(body) {
        return await this.wishlistService.addToWishlist(body);
    }
    constructor(wishlistService){
        this.wishlistService = wishlistService;
    }
};
_ts_decorate([
    (0, _common.Post)('add'),
    _ts_param(0, (0, _common.Body)(new _pipes.ZodValidationPipe(_authdto.signupSchema.pick({
        email: true
    })))),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Object
    ]),
    _ts_metadata("design:returntype", Promise)
], WaitlistController.prototype, "addToWishlist", null);
WaitlistController = _ts_decorate([
    (0, _common.Controller)('waitist'),
    (0, _common.UseFilters)(_exceptions.ErrorExceptionFilter),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _waitlistservice.WaitlistService === "undefined" ? Object : _waitlistservice.WaitlistService
    ])
], WaitlistController);

//# sourceMappingURL=waitlist.controller.js.map