import { EmailRequestDto } from '../dto/email.dto';
import { EmailRequestInterface } from './email-request.interface';

export interface IEmailService {
  sendEmail(mail: EmailRequestInterface): Promise<boolean>;
}
