import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './services/jwt-strategy.service';
import { DataModule } from 'src/data/data.module';
import { UserJwtModule } from 'src/service/jwt/jwt.module';
import { GenerateOtpService } from './request/generate-otp.service';
import { CacheModule } from '@nestjs/cache-manager';
import { ValidateOtpService } from './request/validate-otp.service';
import { RefreshTokenService } from './request/refresh-token.service';
@Module({
  imports: [PassportModule, DataModule, UserJwtModule, CacheModule.register()],
  providers: [
    AuthService,
    JwtStrategy,
    GenerateOtpService,
    ValidateOtpService,
    RefreshTokenService,
  ],
  controllers: [AuthController],
  exports: [],
})
export class AuthModule {}
