import { Module } from '@nestjs/common';
import { F2mModule } from './f2m/f2m.module';
import { DataModule } from '../data/data.module';
import { MovieModule } from './movie/movie.module';
import { TelegramBotModule } from './bot/bot.module';

@Module({
  imports: [
    DataModule,
    TelegramBotModule,
    //F2mModule,
    MovieModule,
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
