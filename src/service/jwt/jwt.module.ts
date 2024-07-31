import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { UserJwtService } from './jwt.service';
import { JwtStrategy } from './jwt.strategy';
import { IJwtService } from 'src/core/interfaces/service/jwt.service';

@Global()
@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('ACCESS_TOKEN_SECRET') || 'secret',
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [
    { provide: IJwtService, useClass: UserJwtService },
    { provide: IJwtService, useClass: UserJwtService },
    JwtStrategy,
  ],
  exports: [IJwtService],
})
export class UserJwtModule {}
