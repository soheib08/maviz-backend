import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ScheduleModule } from '@nestjs/schedule';
import { CacheModule } from '@nestjs/cache-manager';
import { DataModule } from 'src/data/data.module';
import { BullModule } from '@nestjs/bull';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { MovieUrlUpdatedEventListener } from './events/movie_url_updated.event';
import { PaginationUrlCreatedListener } from './events/pagination_url_added.event';
import { RawMovieCreatedListener } from './events/raw_movie_added.event';
import { MovieQueueConsumer } from './consumers/movie_consumer.service';
import { UrlQueueConsumer } from './consumers/url_consumer.service';
import { Crawler } from './services/crawler.service';
import { JobsService } from './services/jobs.service';
import { MovieModule } from '../movie/movie.module';
import { ZarFilmDataExtractor } from './services/zarfilm-data-extractor.service';
import { F2MDataExtractor } from './services/f2m-data-extractor.service';
import { ZarFilmJobsService } from './jobs/zar_film.service';

export const eventHandlers = [
  MovieUrlUpdatedEventListener,
  PaginationUrlCreatedListener,
  RawMovieCreatedListener,
];

export const queueConsumers = [MovieQueueConsumer, UrlQueueConsumer];
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
    MovieModule,
  ],
  providers: [
    Crawler,
    JobsService,
    ZarFilmJobsService,
    // F2MJobsService,
    ...queueConsumers,
    ...eventHandlers,
  ],
  exports: [],
})
export class CrawlerModule {}
