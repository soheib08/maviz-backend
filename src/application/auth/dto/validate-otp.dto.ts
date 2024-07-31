import { ApiProperty } from '@nestjs/swagger';

export class ValidateOtpDto {
  @ApiProperty({ example: 'phone number or email' })
  credential: string;

  @ApiProperty({ example: '5 digit code' })
  code: string;
}
