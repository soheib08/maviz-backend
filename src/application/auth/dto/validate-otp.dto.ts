import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString, MaxLength, MinLength } from 'class-validator';

export class ValidateOtpDto {
  @ApiProperty({ example: 'phone number or email' })
  credential: string;

  @ApiProperty({ example: '5 digit code' })
  @IsNumberString()
  @MaxLength(5)
  @MinLength(5)
  code: string;
}
