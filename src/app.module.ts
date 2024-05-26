import { Module } from '@nestjs/common';
import { DataModule } from './data/data.module';
import { F2mModule } from './application/f2m/f2m.module';
import { MovieModule } from './application/movie/movie.module';
import { TelegramBotModule } from './application/bot/bot.module';
import { OpenAiModule } from './application/openai/openai.module';
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
