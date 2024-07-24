import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { validate } from 'class-validator';
import { LogInDto } from '../dto/log-in.dto';
import { User } from 'src/core/models/user';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(credential: string, code: string): Promise<User> {
    const loginDto = new LogInDto();
    loginDto.username = credential;
    loginDto.password = code;

    const errors = await validate(loginDto);
    if (errors.length > 0) {
      throw new BadRequestException('Validation failed');
    }
    const user = await this.authService.validateUser(credential, code);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return user;
  }
}
