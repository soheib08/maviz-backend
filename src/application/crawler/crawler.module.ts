import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ScheduleModule } from '@nestjs/schedule';
import { CacheModule } from '@nestjs/cache-manager';
import { DataModule } from 'src/data/data.module';
import { BullModule } from '@nestjs/bull';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { MovieUrlUpdatedEventListener } from './f2m/events/movie_url_updated.event';
import { PaginationUrlCreatedListener } from './f2m/events/pagination_url_added.event';
import { RawMovieCreatedListener } from './f2m/events/raw_movie_added.event';
import { MovieQueueConsumer } from './f2m/consumers/movie_consumer.service';
import { UrlQueueConsumer } from './f2m/consumers/url_consumer.service';
import { F2MJobsService } from './f2m/jobs/f2m.service';
import { Crawler } from './f2m/services/crawler.service';
import { JobsService } from './f2m/services/jobs.service';
import { ZarFilmJobsService } from './f2m/jobs/zar_film.service';
import { MovieModule } from '../movie/movie.module';

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
    F2MJobsService,
    MovieQueueConsumer,
    UrlQueueConsumer,
    MovieUrlUpdatedEventListener,
    PaginationUrlCreatedListener,
    RawMovieCreatedListener,
  ],
})
export class CrawlerModule {}
