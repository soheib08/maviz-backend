import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty } from 'class-validator';

export class UserProfileDto {
  @ApiProperty({ example: 'object id' })
  @IsMongoId({ each: true })
  @IsNotEmpty()
  id: string;

  @ApiProperty({ example: 'username@gmail.com' })
  email: string;

  @ApiProperty({ example: '0912318241' })
  phone_number: string;
}
