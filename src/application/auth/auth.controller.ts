import { Controller, Request, Post, Body } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { GenerateOtpDto } from './dto/generate-otp.dto';
import { ValidateOtpDto } from './dto/validate-otp.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { GenerateOtpService } from './request/generate-otp.service';
import { AuthService } from './services/auth.service';
import { ValidateOtpService } from './request/validate-otp.service';
import { RefreshTokenService } from './request/refresh-token.service';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(
    private generateOtpRequest: GenerateOtpService,
    private validateOtpRequest: ValidateOtpService,
    private refreshTokenService: RefreshTokenService,
    private authService: AuthService,
  ) {}
  @Post('otp/generate')
  @ApiBody({ type: GenerateOtpDto })
  async generateOtp(@Body() body: GenerateOtpDto) {
    await this.generateOtpRequest.execute(body);
  }

  @Post('otp/validate')
  @ApiBody({ type: ValidateOtpDto })
  async validateOtp(@Body() body: ValidateOtpDto) {
    const user = await this.validateOtpRequest.execute(body);
    return await this.authService.login(user);
  }

  @Post('refresh-token')
  @ApiBody({ type: RefreshTokenDto })
  async refreshToken(@Body() body: RefreshTokenDto) {
    return await this.refreshTokenService.execute(body);
  }
}
