import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from 'src/core/interfaces/repository/user-repository';
import { IAuthService } from 'src/core/interfaces/service/auth.service';
import { IJwtService } from 'src/core/interfaces/service/jwt.service';
import { User } from 'src/core/models/user';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @Inject(IUserRepository) private userRepository: IUserRepository,
    @Inject(IJwtService)
    private jwtService: IJwtService,
  ) {}

  async login(user: any) {
    const payload = { userId: user.userId };
    return {
      access_token: this.jwtService.generateToken(payload),
    };
  }

  async validateUser(username: string, pass: string): Promise<User> {
    return new User('s', 's');
  }
}
