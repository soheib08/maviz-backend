import { Inject, Injectable } from '@nestjs/common';
import { GenerateOtpDto } from '../dto/generate-otp.dto';
import { MailService } from 'src/service/mail/mail.service';
import SMSService from 'src/service/message/sms.service';
import authConstants from '../auth.constants';
import { isEmail, isPhoneNumber } from 'class-validator';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class GenerateOtpService {
  constructor(
    private emailService: MailService,
    private smsService: SMSService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async execute(request: GenerateOtpDto) {
    const otp = this.generateOtpCode();

    if (isEmail(request.credential)) {
      this.emailService.sendEmail({
        to: request.credential,
        subject: 'Maviz Otp Code',
        code: otp,
        text: 'otp code',
        template: 'mail',
      });
    } else if (isPhoneNumber(request.credential, 'IR')) {
      this.smsService.sendSMSSingleToken(
        request.credential,
        otp,
        authConstants.otp_template,
      );
    }
    await this.cacheManager.set(request.credential, otp, 120000);
  }

  private generateOtpCode() {
    return `${Math.floor(Math.random() * 90000 + 10000)}`;
  }
}
