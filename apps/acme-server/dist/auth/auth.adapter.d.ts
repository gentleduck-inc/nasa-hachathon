import { IoAdapter } from '@nestjs/platform-socket.io';
export declare class EventsAdapter extends IoAdapter {
    private readonly session;
    constructor(session: any);
    createIOServer(port: number, options?: any): any;
}
