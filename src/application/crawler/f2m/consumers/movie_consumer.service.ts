import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { RawMovieCreatedEvent } from '../events/raw_movie_added.event';
import { MovieUrlUpdatedEvent } from '../events/movie_url_updated.event';
import { Crawler } from '../services/crawler.service';

@Processor('movieQueue')
export class MovieQueueConsumer {
  constructor(
    private readonly Crawler: Crawler,
    private eventEmitter: EventEmitter2,
  ) {}
  @Process('processMovie')
  async extractMovieUrlData(job: Job<unknown>) {
    const data = job.data as { url: string; movie_url: string };
    console.log('joooooob', data.movie_url);

    const movie = await this.Crawler.crawlMovieUrl(data.url);
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
