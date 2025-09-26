import { type CanActivate, type ExecutionContext } from '@nestjs/common';
import type { Observable } from 'rxjs';
export declare class AuthGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean>;
}
