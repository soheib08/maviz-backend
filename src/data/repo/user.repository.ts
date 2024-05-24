import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../schemas/user.schema';
import { IUserRepository } from 'src/core/interfaces/repository/user-repository.interface';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(@InjectModel(User.name) private UserModel: Model<User>) {}

  async createOne(entity: User) {
    const createdEntity = new this.UserModel(entity);
    return createdEntity.save();
  }

  async find() {
    return await this.UserModel.find().lean();
  }

  async findOne(name: string) {
    return await this.UserModel.findOne({
      name: name,
    });
  }

  async updateOne(id: string, updatedEntityDto: User) {
    await this.UserModel.updateOne(
      {
        _id: id,
      },
      {
        $set: {
          ...updatedEntityDto,
        },
      },
    );
  }

  async deleteOne(id: string) {
    return await this.UserModel.deleteOne({
      _id: id,
    });
  }
}
