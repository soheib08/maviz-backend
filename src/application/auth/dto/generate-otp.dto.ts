import { ApiProperty } from '@nestjs/swagger';
import { IsEmailOrPhone } from '../services/credential-validator.service';
import { IsString } from 'class-validator';

export class GenerateOtpDto {
  @ApiProperty({ example: '09381385204' })
  @IsEmailOrPhone({ message: 'Credential must be phone number or email' })
  @IsString()
  credential: string;
}
