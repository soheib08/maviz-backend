import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { DataModule } from 'src/data/data.module';

@Module({
  imports: [DataModule],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
