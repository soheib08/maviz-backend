import { Module } from '@nestjs/common';
import { DataModule } from './data/data.module';
import { F2mModule } from './app/f2m/f2m.module';
import { MovieModule } from './app/movie/movie.module';
import { TelegramBotModule } from './app/bot/bot.module';
import { OpenAiModule } from './app/openai/openai.module';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    DataModule,
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    //OpenAiModule,
    //TelegramBotModule,
    F2mModule,
    // MovieModule,
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
