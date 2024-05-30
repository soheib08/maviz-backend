import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { F2MCrawler } from '../services/f2m-crawler.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { PaginationUrlCreatedEvent } from '../events/paginationUrl-added.event';

@Processor('urlQueue')
export class UrlQueueConsumer {
  constructor(
    private readonly f2mCrawler: F2MCrawler,
    private eventEmitter: EventEmitter2,
  ) {}
  @Process('processUrl')
  async extractPaginationUrlData(job: Job<unknown>) {
    const data = job.data as { url: string; site: string };
    try {
      const { movieUrls, paginationUrls } =
        await this.f2mCrawler.crawlPaginationUrl(data.url);
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
