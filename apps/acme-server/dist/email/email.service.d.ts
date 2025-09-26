import { ConfigService } from '@nestjs/config';
import type { EmailTemplate } from './email.types';
export declare class EmailService {
    private readonly config;
    constructor(config: ConfigService);
    private transporter;
    sendTestEmail({ from, to, subject, text, template, }: {
        from?: string;
        to: string;
        subject: string;
        text: string;
        template: EmailTemplate;
    }): Promise<void>;
}
