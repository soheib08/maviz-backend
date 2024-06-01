import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ScheduleModule } from '@nestjs/schedule';
import { CacheModule } from '@nestjs/cache-manager';
import { DataModule } from 'src/data/data.module';
import { BullModule } from '@nestjs/bull';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ZarFilmCrawlerService } from './zarfilm-crawler.service';
import { ZarFilmDataExtractor } from './zarfilm-data-extractor.service';
import { UrlQueueConsumer } from './consumers/zarfilm-url-consumer.service';
import { ZarFilmJobsService } from './zarfilm.jobs.service';
import { PaginationUrlCreatedListener } from './events/paginationUrl-added.event';
import { MovieQueueConsumer } from './consumers/zarfilm-movieUrl-consumer.service';
import { RawMovieCreatedListener } from './events/rawMovie-added.event';
import { MovieUrlUpdatedEventListener } from './events/movieUrl-updated.event';

@Module({
  imports: [
    DataModule,
    HttpModule,
    CacheModule.register(),
    ScheduleModule.forRoot(),
    BullModule.registerQueue({
      name: 'ZarUrlQueue',
      defaultJobOptions: {
        removeOnComplete: true,
        removeOnFail: true,
      },
    }),
    BullModule.registerQueue({
      name: 'ZarMovieQueue',
      defaultJobOptions: {
        removeOnComplete: true,
        removeOnFail: true,
      },
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
    ZarFilmCrawlerService,
    UrlQueueConsumer,
    MovieQueueConsumer,
    PaginationUrlCreatedListener,
    RawMovieCreatedListener,
    MovieUrlUpdatedEventListener,
    ZarFilmJobsService,
  ],
})
export class ZarFilmModule {}
