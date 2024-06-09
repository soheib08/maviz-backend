import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { JobsService } from '../services/jobs.service';
import { F2MBaseUrl, F2MSiteName } from '../constants/crawler_constants';

@Injectable()
export class F2MJobsService {
  private readonly logger = new Logger(F2MJobsService.name);
  constructor(private jobService: JobsService) {}

  @Cron(CronExpression.EVERY_HOUR)
  async siteIndexJob() {
    this.logger.debug('start crawling f2m...');
    this.jobService.startSiteIndexJob(F2MSiteName, F2MBaseUrl);
  }

  @Cron(CronExpression.EVERY_HOUR)
  async getMoviesDataJob() {
    this.logger.debug('start crawl movie_urls from f2m...');
    this.jobService.startMovieJob(F2MSiteName);
  }
}
