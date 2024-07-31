import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { LocalStrategy } from './services/local-straregy.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './services/jwt-strategy.service';
import { DataModule } from 'src/data/data.module';
import { UserJwtModule } from 'src/service/jwt/jwt.module';
import { GenerateOtpService } from './request/generate-otp.service';
@Module({
  imports: [PassportModule, DataModule, UserJwtModule],
  providers: [AuthService, LocalStrategy, JwtStrategy, GenerateOtpService],
  controllers: [AuthController],
  exports: [],
})
export class AuthModule {}
