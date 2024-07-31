import { Global, Module } from '@nestjs/common';
import SMSService from './sms.service';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';

@Global()
@Module({
  imports: [
    ConfigModule,
    HttpModule.register({
      timeout: 30000,
      maxRedirects: 5,
    }),
  ],
  providers: [SMSService],
  exports: [SMSService],
})
export default class SmsModule {}
