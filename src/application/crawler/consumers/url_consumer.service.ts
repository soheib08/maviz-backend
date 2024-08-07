import { OnQueueError, OnQueueEvent, Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { PaginationUrlCreatedEvent } from '../events/pagination_url_added.event';
import { Crawler } from '../services/crawler.service';
import { IDataExtractor } from 'src/core/interfaces/crawler/data-extractor.interface';
import { JobsService } from '../services/jobs.service';

@Processor('urlQueue')
export class UrlQueueConsumer {
  constructor(
    private readonly Crawler: Crawler,
    private eventEmitter: EventEmitter2,
    private jobService: JobsService,
  ) {}

  @OnQueueError()
  handleQueueError(error: Error) {
    console.error('Queue Error:', error);
  }

  @Process('processUrl')
  async extractPaginationUrlData(job: Job<unknown>) {
    const data = job.data as {
      url: string;
      site: string;
      headers: any;
    };
    console.log('step: consumers');

    try {
      const dataExtractor: IDataExtractor = this.jobService.getDataExtractor(
        data.site,
      );
      const { movieUrls, paginationUrls } =
        await this.Crawler.crawlPaginationUrl(data.url, dataExtractor);
      this.eventEmitter.emit(
        'paginationUrl.created',
        new PaginationUrlCreatedEvent(paginationUrls, movieUrls, data.site),
      );
    } catch (err) {
      console.log('error on process pagination url');
      console.log(err);
    }
  }
}
