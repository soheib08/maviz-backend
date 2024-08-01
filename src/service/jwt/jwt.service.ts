import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IJwtService } from 'src/core/interfaces/service/jwt.service';
import { DecodedUser } from 'src/core/interfaces/user.interface';

@Injectable()
export class UserJwtService implements IJwtService {
  constructor(private jwtService: JwtService) {}

  verifyToken(token: string): DecodedUser {
    const payload = this.jwtService.verify(token);
    return payload;
  }

  generateToken(payload: any, expireIn: string): string {
    return this.jwtService.sign(payload, { expiresIn: expireIn });
  }
}
