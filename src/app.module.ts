import { Module } from '@nestjs/common';
import { DataModule } from './data/data.module';
import { AiModule } from './application/ai/ai.module';
import { BullModule } from '@nestjs/bull';
import { CrawlerModule } from './application/crawler/crawler.module';
import { MovieModule } from './application/movie/movie.module';
import { UserJwtModule } from './service/jwt/jwt.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DataModule,
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    UserJwtModule,
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
