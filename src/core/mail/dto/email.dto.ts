import { EmailRequestInterface } from '../interface/email-request.interface';

export class EmailRequestDto implements EmailRequestInterface {
  to: string;
  template?: string;
  subject: string;
  text: string;
  code: string;
}
