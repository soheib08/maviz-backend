import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Crawler } from '../services/crawler.service';
import { JobsService } from '../services/jobs.service';
import { IDataExtractor } from 'src/core/interfaces/data-extractor.interface';
import { RawMovieCreatedEvent } from '../events/raw_movie_added.event';
import { MovieUrlUpdatedEvent } from '../events/movie_url_updated.event';

@Processor('movieQueue')
export class MovieQueueConsumer {
  constructor(
    private readonly Crawler: Crawler,
    private eventEmitter: EventEmitter2,
    private jobService: JobsService,
  ) {}
  @Process('processMovie')
  async extractMovieUrlData(job: Job<unknown>) {
    const data = job.data as {
      url: string;
      movie_url: string;
      extractor: string;
    };

    const dataExtractor: IDataExtractor = this.jobService.getDataExtractor(
      data.extractor,
    );
    const movie = await this.Crawler.crawlMovieUrl(data.url, dataExtractor);
    movie.base_url = data.movie_url;
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
