"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "MinioService", {
    enumerable: true,
    get: function() {
        return MinioService;
    }
});
const _clients3 = require("@aws-sdk/client-s3");
const _common = require("@nestjs/common");
const _nestwinston = require("nest-winston");
const _libs = require("../common/libs");
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
let MinioService = class MinioService {
    async ensureBucketExists() {
        try {
            await this.s3.send(new _clients3.HeadBucketCommand({
                Bucket: this.bucket
            }));
        } catch (error) {
            this.logger.warn(`Bucket "${this.bucket}" not found. Creating...`);
            await this.s3.send(new _clients3.CreateBucketCommand({
                Bucket: this.bucket
            }));
        }
    }
    async uploadFile(key, body, contentType) {
        try {
            await this.ensureBucketExists();
            const command = new _clients3.PutObjectCommand({
                Body: body,
                Bucket: this.bucket,
                ContentType: contentType,
                Key: key
            });
            await this.s3.send(command);
            return `${this.bucket}/${key}`;
        } catch (error) {
            (0, _libs.throwError)('MINIO_FILE_DOWNLOAD_FAILED');
            return;
        }
    }
    async getFile(key) {
        try {
            const command = new _clients3.GetObjectCommand({
                Bucket: this.bucket,
                Key: key
            });
            const result = await this.s3.send(command);
            return result.Body;
        } catch (error) {
            (0, _libs.throwError)('MINIO_FILE_DOWNLOAD_FAILED');
            return;
        }
    }
    constructor(config, logger){
        this.config = config;
        this.logger = logger;
        this.bucket = this.config.get('MINIO_BUCKET') || 'uploads';
        this.s3 = new _clients3.S3Client({
            credentials: {
                accessKeyId: this.config.get('MINIO_ACCESS_KEY') ?? 'root',
                secretAccessKey: this.config.get('MINIO_SECRET_KEY') ?? 'root'
            },
            endpoint: this.config.get('MINIO_ENDPOINT') ?? 'http://localhost:9000',
            forcePathStyle: true,
            region: this.config.get('MINIO_REGION') ?? 'us-east-1'
        });
    }
};
MinioService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(1, (0, _common.Inject)(_nestwinston.WINSTON_MODULE_NEST_PROVIDER)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof ConfigService === "undefined" ? Object : ConfigService,
        typeof WinstonLogger === "undefined" ? Object : WinstonLogger
    ])
], MinioService);

//# sourceMappingURL=minio.service.js.map