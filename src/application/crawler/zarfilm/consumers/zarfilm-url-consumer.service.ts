import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { PaginationUrlCreatedEvent } from '../events/paginationUrl-added.event';
import { ZarFilmService } from '../zarfilm-crawler.service';

@Processor('ZarUrlQueue')
export class UrlQueueConsumer {
  constructor(
    private readonly zarFilmCrawler: ZarFilmService,
    private eventEmitter: EventEmitter2,
  ) {}
  @Process('processUrl')
  async extractPaginationUrlData(job: Job<unknown>) {
    const data = job.data as { url: string; site: string };
    try {
      console.log('on consumer');

      const { movieUrls, paginationUrls } =
        await this.zarFilmCrawler.crawlPaginationUrl(data.url);
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
