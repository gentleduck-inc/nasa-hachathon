import type { EmailTemplate } from '../email.types';
export declare function renderEmailTemplate(templateName: EmailTemplate['name'], props: EmailTemplate['args']): Promise<string>;
