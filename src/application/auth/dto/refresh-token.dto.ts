import { ApiProperty } from '@nestjs/swagger';
import { IsBase64, IsString } from 'class-validator';

export class RefreshTokenDto {
  @ApiProperty({ example: 'refresh token' })
  @IsString()
  @IsBase64()
  refresh_token: string;
}
