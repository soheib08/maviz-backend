import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { PaginationUrlCreatedEvent } from '../events/pagination_url_added.event';
import { Crawler } from '../services/crawler.service';

@Processor('urlQueue')
export class UrlQueueConsumer {
  constructor(
    private readonly Crawler: Crawler,
    private eventEmitter: EventEmitter2,
  ) {}
  @Process('processUrl')
  async extractPaginationUrlData(job: Job<unknown>) {
    const data = job.data as { url: string; site: string };
    try {
      const { movieUrls, paginationUrls } =
        await this.Crawler.crawlPaginationUrl(data.url);
      console.log('start extracting data from pagination url...');
      this.eventEmitter.emit(
        'paginationUrl.created',
        new PaginationUrlCreatedEvent(paginationUrls, movieUrls, data.site),
      );
      console.log('data of pagination url has been saved');
    } catch (err) {
      console.log('error on process pagination url');
    }
  }
}
