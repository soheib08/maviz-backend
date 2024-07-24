import { User } from 'src/core/models/user';
import { IGenericRepository } from './generic-repository';

export interface IUserRepository extends IGenericRepository<User> {
  findOne(id: string): Promise<User>;

  createOne(entity: User): Promise<User>;

  updateOne(id: string, entity: User): Promise<void>;

  find(): Promise<User[]>;

  deleteOne(id: string): void;
}
export const IUserRepository = Symbol('IUserRepository');
