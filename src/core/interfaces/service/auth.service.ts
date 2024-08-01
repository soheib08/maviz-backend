import { User } from '../../models/user';

export interface IAuthService {
  validateUser(
    username: string,
    password: string,
    credentialType: string,
  ): Promise<User>;
}
