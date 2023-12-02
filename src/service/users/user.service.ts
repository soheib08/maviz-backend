import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from 'src/core/interfaces/user-repository.interface';
import { User } from 'src/core/models/user';

@Injectable()
export class UserService {
  constructor(
    @Inject(IUserRepository)
    private readonly userRepository: IUserRepository,
  ) {}

  async createUser(telegramUsername: string): Promise<User> {
    let user = new User(telegramUsername);
    return await this.userRepository.createOne(user);
  }

  async getUserByUsername(telegramUsername: string): Promise<User | undefined> {
    return await this.userRepository.findOne(telegramUsername);
  }
}
