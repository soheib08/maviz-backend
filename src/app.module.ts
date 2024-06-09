import { Module } from '@nestjs/common';
import { DataModule } from './data/data.module';
import { AiModule } from './application/ai/ai.module';
import { BullModule } from '@nestjs/bull';
import { CrawlerModule } from './application/crawler/crawler.module';
import { MovieModule } from './application/movie/movie.module';

@Module({
  imports: [
    DataModule,
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    AiModule,
    //TelegramBotModule,
    MovieModule,
    CrawlerModule,
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
