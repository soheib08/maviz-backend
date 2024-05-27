import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ScheduleModule } from '@nestjs/schedule';
import { CacheModule } from '@nestjs/cache-manager';
import { F2MCrawler } from './services/f2m-crawler.service';
import { DataModule } from 'src/data/data.module';
import { BullModule } from '@nestjs/bull';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { MovieUrlUpdatedEventListener } from './events/movieUrl-updated.event';
import { PaginationUrlCreatedListener } from './events/paginationUrl-added.event';
import { RawMovieCreatedListener } from './events/rawmovie-added.event';
import { F2MJobsService } from './services/f2m-jobs.service';
import { MovieQueueConsumer } from './consumers/f2m-movie-consumer.service';
import { UrlQueueConsumer } from './consumers/f2m-url-consumer.service';
import { GeminiService } from '../ai/gemini.service';

@Module({
  imports: [
    DataModule,
    HttpModule,
    CacheModule.register(),
    ScheduleModule.forRoot(),
    BullModule.registerQueue({
      name: 'urlQueue',
    }),
    BullModule.registerQueue({
      name: 'movieQueue',
    }),
    EventEmitterModule.forRoot(),
  ],
  providers: [
    F2MCrawler,
    MovieUrlUpdatedEventListener,
    PaginationUrlCreatedListener,
    RawMovieCreatedListener,
    MovieQueueConsumer,
    UrlQueueConsumer,
    F2MJobsService,
  ],
})
export class F2mModule {}
