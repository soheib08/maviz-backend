import { Module } from '@nestjs/common';
import { TelegrafModule } from 'nestjs-telegraf';
import { TelegramBotService } from './bot.service';
import { UserModule } from 'src/service/users/user.module';
import { MovieModule } from '../movie/movie.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    TelegrafModule.forRoot({
      token: '6403421446:AAEv069dxMZG9JgUFfio_rYClBnRHEDQcpc',
    }),
    HttpModule,
    MovieModule,
    UserModule,
  ],
  providers: [TelegramBotService],
})
export class TelegramBotModule {}
