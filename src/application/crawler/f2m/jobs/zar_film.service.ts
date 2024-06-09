import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import {
  ZarFilmBaseUrl,
  ZarFilmSiteName,
} from '../constants/crawler_constants';
import { JobsService } from '../services/jobs.service';

@Injectable()
export class ZarFilmJobsService {
  private readonly logger = new Logger(ZarFilmJobsService.name);
  constructor(private jobService: JobsService) {}

  @Cron(CronExpression.EVERY_HOUR)
  async siteIndexJob() {
    this.logger.debug('start crawling zarfilm.com ...');
    this.jobService.startSiteIndexJob(ZarFilmSiteName, ZarFilmBaseUrl);
  }

  @Cron(CronExpression.EVERY_HOUR)
  async getMoviesDataJob() {
    this.logger.debug('start crawl from movie urls from zarfilm.com ...');
    this.jobService.startMovieJob(ZarFilmSiteName);
  }
}
