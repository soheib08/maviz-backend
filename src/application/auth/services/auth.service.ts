import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from 'src/core/interfaces/repository/user-repository.interface';
import { IAuthService } from 'src/core/interfaces/service/auth.service';
import { ITokenService } from 'src/core/interfaces/service/token.service';
import { User } from 'src/core/models/user';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @Inject(IUserRepository) private userRepository: IUserRepository,
    @Inject(ITokenService)
    private jwtService: ITokenService,
  ) {}

  async login(user: any) {
    const payload = { userId: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateUser(username: string, pass: string): Promise<User> {
    return new User('s', 's');
  }
}
