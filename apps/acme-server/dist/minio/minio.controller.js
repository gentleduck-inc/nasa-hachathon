"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "MinioController", {
    enumerable: true,
    get: function() {
        return MinioController;
    }
});
const _common = require("@nestjs/common");
const _platformexpress = require("@nestjs/platform-express");
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
let MinioController = class MinioController {
    async upload(file) {
        const path = await this.minioService.uploadFile(file.originalname, file.buffer, file.mimetype);
        return {
            data: path,
            message: 'MINIO_FILE_UPLOAD_SUCCESS',
            state: 'success'
        };
    }
    async download(filename, res) {
        const fileStream = await this.minioService.getFile(filename);
        fileStream?.pipe(res);
    }
    constructor(minioService){
        this.minioService = minioService;
    }
};
_ts_decorate([
    (0, _common.Post)(),
    (0, _common.UseInterceptors)((0, _platformexpress.FileInterceptor)('file')),
    _ts_param(0, (0, _common.UploadedFile)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Object
    ]),
    _ts_metadata("design:returntype", Promise)
], MinioController.prototype, "upload", null);
_ts_decorate([
    (0, _common.Get)(':filename'),
    _ts_param(0, (0, _common.Param)('filename')),
    _ts_param(1, (0, _common.Res)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        typeof Response === "undefined" ? Object : Response
    ]),
    _ts_metadata("design:returntype", Promise)
], MinioController.prototype, "download", null);
MinioController = _ts_decorate([
    (0, _common.Controller)('upload'),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof MinioService === "undefined" ? Object : MinioService
    ])
], MinioController);

//# sourceMappingURL=minio.controller.js.map