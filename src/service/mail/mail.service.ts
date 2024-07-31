import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { EmailRequestDto } from '../../core/mail/dto/email.dto';
import { IEmailService } from 'src/core/mail/interface/email-service.interface';

@Injectable()
export class MailService implements IEmailService {
  constructor(private mailerService: MailerService) {}

  async sendEmail(request: EmailRequestDto): Promise<boolean> {
    try {
      const { to, subject, code, text } = request;
      await this.mailerService.sendMail({
        to,
        subject,
        template: request.template ? request.template : 'mail',
        context: {
          code,
          text,
        },
      });
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }
}
