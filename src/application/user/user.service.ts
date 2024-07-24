import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IUserRepository } from 'src/core/interfaces/repository/user-repository.interface';
import { CreateUserDto, UpdateUserDto } from './dto/create-user.dto';
import { User } from 'src/core/models/user';

@Injectable()
export class UserService {
  constructor(
    @Inject(IUserRepository) private userRepository: IUserRepository,
  ) {}

  async createUser(user: CreateUserDto) {
    let newUser = new User(user.email, user.phone_number);

    await this.userRepository.createOne(newUser);

    return newUser;
  }
  async getUserProfile(userId: string) {
    let foundUser = await this.userRepository.findOne(userId);
    if (!foundUser) throw new NotFoundException('User not found');
    return foundUser;
  }

  async updateUser(update: UpdateUserDto) {
    let foundUser = await this.userRepository.findOne(update.id);
    if (!foundUser) throw new NotFoundException('User not found');

    if (!foundUser.email) foundUser.email = update.email;
    if (!foundUser.phone_number) foundUser.email = update.phone_number;

    await this.userRepository.updateOne(foundUser.id, foundUser);
  }

  async userList() {
    let foundUsers = await this.userRepository.find();

    return foundUsers.map((user) => {
      return { ...user, id: user.id };
    });
  }
}
