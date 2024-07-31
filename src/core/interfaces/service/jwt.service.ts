import { DecodedUser } from '../user.interface';

export interface IJwtService {
  generateToken(payload: {}): string;
  verifyToken(token: string): DecodedUser;
}
export const IJwtService = Symbol('IJwtService');
