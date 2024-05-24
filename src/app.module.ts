import { Module } from '@nestjs/common';
import { F2mModule } from './app/f2m/f2m.module';
import { DataModule } from './data/data.module';
import { MovieModule } from './app/movie/movie.module';
import { TelegramBotModule } from './app/bot/bot.module';
import { OpenAiModule } from './app/openai/openai.module';

@Module({
  imports: [
    DataModule,
    OpenAiModule,
    //  TelegramBotModule,
    //F2mModule,
    // MovieModule,
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
