import {
  ForbiddenException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { RefreshTokenDto } from '../dto/refresh-token.dto';
import { DecodedUser } from 'src/core/interfaces/user.interface';
import { IJwtService } from 'src/core/interfaces/service/jwt.service';
import { IUserRepository } from 'src/core/interfaces/repository/user-repository';

@Injectable()
export class RefreshTokenService {
  constructor(
    private authService: AuthService,
    @Inject(IUserRepository) private userRepository: IUserRepository,
    @Inject(IJwtService) private jwtService: IJwtService,
  ) {}

  async execute(request: RefreshTokenDto) {
    const decodedUser = this.jwtService.verifyToken(
      request.refresh_token,
    ) as DecodedUser;

    if (!decodedUser) throw new ForbiddenException('forbidden');

    const foundUser = await this.userRepository.findOne(decodedUser.userId);
    if (!foundUser) throw new ForbiddenException('user not found');

    if (
      !foundUser.refresh_token ||
      foundUser.refresh_token !== request.refresh_token
    )
      throw new UnauthorizedException('forbidden');

    return await this.authService.login({ id: decodedUser.userId });
  }
}
