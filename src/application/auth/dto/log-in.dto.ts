import { ApiProperty } from '@nestjs/swagger';

export class LogInDto {
  @ApiProperty({ example: 'username' })
  username: string;

  @ApiProperty({ example: 'asdajsfh313n' })
  password: string;
}
