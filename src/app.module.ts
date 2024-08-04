import { Module } from '@nestjs/common';
import { DataModule } from './data/data.module';
import { AiModule } from './application/ai/ai.module';
import { BullModule } from '@nestjs/bull';
import { CrawlerModule } from './application/crawler/crawler.module';
import { MovieModule } from './application/movie/movie.module';
import { UserJwtModule } from './service/jwt/jwt.module';
import { ConfigModule } from '@nestjs/config';
import { MailModule } from './service/mail/mail.module';
import SmsModule from './service/message/sms.module';
import { AuthModule } from './application/auth/auth.module';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    DataModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    BullModule.forRoot({
      redis: {
        host: '127.0.0.1',
        port: 6379,
        maxRetriesPerRequest: 3,
      },
    }),
    MailModule,
    SmsModule,
    // AiModule,
    //TelegramBotModule,
    MovieModule,
    CrawlerModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
