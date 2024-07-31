import { Controller, Request, Post, UseGuards, Body } from '@nestjs/common';
import { LocalAuthGuard } from './guards/auth.guard';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { GenerateOtpDto } from './dto/generate-otp.dto';
import { ValidateOtpDto } from './dto/validate-otp.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { GenerateOtpService } from './request/generate-otp.service';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private generateOtpRequest: GenerateOtpService) {}
  @Post('otp/generate')
  @ApiBody({ type: GenerateOtpDto })
  async generateOtp(@Body() body: GenerateOtpDto) {
    await this.generateOtpRequest.execute(body);
  }

  @Post('otp/validate')
  @ApiBody({ type: ValidateOtpDto })
  @UseGuards(LocalAuthGuard)
  async validateOtp(@Request() req) {
    return req.user;
  }

  @Post('refresh-token')
  @ApiBody({ type: RefreshTokenDto })
  async refreshToken(@Request() req) {
    return req.user;
  }
}
