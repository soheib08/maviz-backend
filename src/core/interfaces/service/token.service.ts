import { User } from 'src/core/models/user';

export interface ITokenService {
  sign(token: { userId: string }): Promise<string>;
  verify(token: string): Promise<User>;
}

export const ITokenService = Symbol('ITokenService');
