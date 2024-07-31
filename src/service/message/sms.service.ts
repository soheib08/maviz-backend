import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export default class SMSService {
  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {}

  async sendSMSSingleToken(
    mobile: string,
    token: string,
    template: string,
  ): Promise<boolean> {
    try {
      let url: string = `${this.configService.get<string>(
        'OTP_BASE_URL',
      )}receptor=${mobile}&&token=${token}&&template=${template}`;

      let response = await this.httpService.axiosRef.get(url);
      if (response.data.return.status == 200) return true;
      else return false;
    } catch (err) {
      console.log('sms error log', err);
      return false;
    }
  }

  async sendSMSDoubleToken(
    mobile: string,
    token: string,
    token2: string,
    template: string,
  ): Promise<boolean> {
    try {
      let url: string = `${this.configService.get<string>(
        'OTP_BASE_URL',
      )}receptor=${mobile}&&token=${token}&&token2=${token2}&&template=${template}`;
      let response = await this.httpService.axiosRef.get(url);
      if (response.data.return.status == 200) return true;
      else return false;
    } catch (err) {
      console.log('sms error log', err);
      return false;
    }
  }
}
