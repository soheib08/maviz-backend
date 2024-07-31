import { EmailRequestInterface } from 'src/core/mail/interface/email-request.interface';

const authConstants = {
  otp_template: 'LoginOTP',
};

export const verificationEmailValues: EmailRequestInterface = {
  subject: 'تایید آدرس ایمیل',
  text: 'لطفا برای تایید ایمیل خود بر روی  لینک زیر کلیک کنید',
  code: 'تایید ایمیل',
};
export default authConstants;
