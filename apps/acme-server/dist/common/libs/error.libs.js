import { WsException } from '@nestjs/websockets';
export function throwError(string, status) {
    throw new Error(string, {
        cause: status,
    });
}
export function throwWSError(string) {
    throw new WsException(string);
}
//# sourceMappingURL=error.libs.js.map