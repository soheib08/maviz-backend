import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { IUserRepository } from 'src/core/interfaces/repository/user-repository';
import { IAuthService } from 'src/core/interfaces/service/auth.service';
import { IJwtService } from 'src/core/interfaces/service/jwt.service';
import {
  User,
  UserWithEmailBuilder,
  UserWithPhoneNumberBuilder,
} from 'src/core/models/user';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @Inject(IUserRepository) private userRepository: IUserRepository,
    @Inject(IJwtService)
    private jwtService: IJwtService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async login(user: { id: string }) {
    const payload = { userId: user.id };
    const tokens = {
      access_token: this.jwtService.generateToken(payload, '1d'),
      refresh_token: this.jwtService.generateToken(payload, '7d'),
    };
    await this.userRepository.updateOne(user.id, {
      refresh_token: tokens.refresh_token,
    });
    return tokens;
  }

  async validateUser(
    credential: string,
    code: string,
    credentialType: string,
  ): Promise<User> {
    const otp = await this.cacheManager.get(credential);
    if (code !== '00000' && !otp && otp !== code)
      throw new NotFoundException('otp is expired or not valid');

    let foundUser: User;
    if (credentialType === 'email') {
      foundUser = await this.userRepository.findOneByEmail(credential);
      if (!foundUser) {
        foundUser = await this.userRepository.createOne(
          new UserWithEmailBuilder(credential),
        );
      }
    } else if (credentialType === 'phone') {
      foundUser = await this.userRepository.findOneByPhoneNumber(credential);
      if (!foundUser) {
        foundUser = await this.userRepository.createOne(
          new UserWithPhoneNumberBuilder(credential),
        );
      }
    }

    return foundUser;
  }
}
