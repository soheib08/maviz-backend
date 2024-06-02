import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { F2MCrawler } from '../services/f2m-crawler.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { RawMovieCreatedEvent } from '../events/rawmovie-added.event';
import { MovieUrlUpdatedEvent } from '../events/movieUrl-updated.event';

@Processor('movieQueue')
export class MovieQueueConsumer {
  constructor(
    private readonly f2mCrawler: F2MCrawler,
    private eventEmitter: EventEmitter2,
  ) {}
  @Process('processMovie')
  async extractMovieUrlData(job: Job<unknown>) {
    const data = job.data as { url: string };
    const movie = await this.f2mCrawler.crawlMovieUrl(data.url);
    this.eventEmitter.emit('rawMovie.created', new RawMovieCreatedEvent(movie));
    this.eventEmitter.emit(
      'movieUrl.updated',
      new MovieUrlUpdatedEvent(data.url),
    );
  }
}