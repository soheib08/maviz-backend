import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { validate } from 'class-validator';
import { User } from 'src/core/models/user';
import { ValidateOtpDto } from '../dto/validate-otp.dto';
import { isEmailOrPhoneNumber } from './credential-validator.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(credential: string, code: string): Promise<User> {
    const loginDto = new ValidateOtpDto();
    if (!isEmailOrPhoneNumber(credential))
      throw new BadRequestException('Credential must be email or phone number');

    loginDto.credential = credential;
    loginDto.code = code;

    const errors = await validate(loginDto);
    if (errors.length > 0) throw new BadRequestException('Validation failed');

    const user = await this.authService.validateUser(credential, code);
    if (!user) throw new UnauthorizedException('Invalid credentials');

    return user;
  }
}
