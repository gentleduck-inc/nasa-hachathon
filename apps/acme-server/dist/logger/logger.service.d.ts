export declare class LoggerService {
    getRequestMetadata(req: any): {
        headers: any;
        ip: string;
        referer: any;
        userAgent: any;
    };
    private getIp;
    private isPrivateIp;
    private getPublicIpSync;
}
