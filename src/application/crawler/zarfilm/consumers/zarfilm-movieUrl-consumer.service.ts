import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ZarFilmCrawlerService } from '../zarfilm-crawler.service';
import { RawMovieCreatedEvent } from '../events/rawMovie-added.event';
import { MovieUrlUpdatedEvent } from '../events/movieUrl-updated.event';

@Processor('ZarMovieQueue')
export class MovieQueueConsumer {
  constructor(
    private readonly zarFilmCrawler: ZarFilmCrawlerService,
    private eventEmitter: EventEmitter2,
  ) {}
  @Process('processMovie')
  async extractMovieUrlData(job: Job<unknown>) {
    const data = job.data as { url: string; movie_url: string };
    console.log('joooooob', data.movie_url);

    const movie = await this.zarFilmCrawler.crawlMovieUrl(data.url);
    console.log('extracted movie :', movie);

    this.eventEmitter.emit(
      'rawMovie.created',
      new RawMovieCreatedEvent(movie, data.movie_url),
    );
    this.eventEmitter.emit(
      'movieUrl.updated',
      new MovieUrlUpdatedEvent(data.url),
    );
  }
}
