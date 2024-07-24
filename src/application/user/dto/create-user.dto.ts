import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'username@gmail.com' })
  @IsString()
  @IsOptional()
  email: string;

  @ApiProperty({ example: '0912318241' })
  @IsString()
  @IsOptional()
  phone_number: string;
}

export class UpdateUserDto {
  @ApiProperty({ example: 'object id' })
  @IsMongoId({ each: true })
  @IsNotEmpty()
  id: string;

  @ApiProperty({ example: 'username@gmail.com' })
  @IsString()
  @IsOptional()
  email: string;

  @ApiProperty({ example: '0912318241' })
  @IsString()
  @IsOptional()
  phone_number: string;
}
