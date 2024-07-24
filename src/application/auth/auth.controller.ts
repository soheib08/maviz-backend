import { Controller, Request, Post, UseGuards, Get } from '@nestjs/common';
import { LocalAuthGuard } from './guards/auth.guard';
import { ApiBody } from '@nestjs/swagger';
import { LogInDto } from './dto/log-in.dto';

@Controller()
export class AuthController {
  @Post('otp/generate')
  @ApiBody({ type: LogInDto })
  async generateOtp(@Request() req) {
    return req.user;
  }

  @Post('otp/validate')
  @ApiBody({ type: LogInDto })
  @UseGuards(LocalAuthGuard)
  async validateOtp(@Request() req) {
    return req.user;
  }

  @Post('refresh-token')
  @ApiBody({ type: LogInDto })
  async refreshToken(@Request() req) {
    return req.user;
  }
}
