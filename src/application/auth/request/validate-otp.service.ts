import { BadRequestException, Injectable } from '@nestjs/common';
import { ValidateOtpDto } from '../dto/validate-otp.dto';
import { isEmailOrPhoneNumber } from '../services/credential-validator.service';
import { AuthService } from '../services/auth.service';

@Injectable()
export class ValidateOtpService {
  constructor(private authService: AuthService) {}

  async execute(request: ValidateOtpDto) {
    let credentialType = isEmailOrPhoneNumber(request.credential);

    if (!credentialType)
      throw new BadRequestException('Credential must be email or phone number');

    const user = await this.authService.validateUser(
      request.credential,
      request.code,
      credentialType,
    );

    return user;
  }
}
