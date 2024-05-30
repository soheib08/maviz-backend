import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ScheduleModule } from '@nestjs/schedule';
import { CacheModule } from '@nestjs/cache-manager';
import { DataModule } from 'src/data/data.module';
import { BullModule } from '@nestjs/bull';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ZarFilmService } from './zarfilm-crawler.service';
import { ZarFilmDataExtractor } from './zarfilm-data-extractor.service';
import { UrlQueueConsumer } from './consumers/zarfilm-url-consumer.service';
import { ZarFilmJobsService } from './zarfilm.jobs.service';
import { PaginationUrlCreatedListener } from './events/paginationUrl-added.event';

@Module({
  imports: [
    DataModule,
    HttpModule,
    CacheModule.register(),
    ScheduleModule.forRoot(),
    BullModule.registerQueue({
      name: 'ZarUrlQueue',
    }),
    BullModule.registerQueue({
      name: 'ZarMovieQueue',
    }),
    EventEmitterModule.forRoot(),
  ],
  providers: [
    // F2MCrawler,
    // MovieUrlUpdatedEventListener,
    // PaginationUrlCreatedListener,
    // RawMovieCreatedListener,
    // MovieQueueConsumer,
    // F2MJobsService,
    ZarFilmService,
    UrlQueueConsumer,
    ZarFilmJobsService,
    PaginationUrlCreatedListener,
  ],
})
export class ZarFilmModule {}
