import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { JobsService } from '../services/jobs.service';
import {
  ZarFilmBaseUrl,
  ZarFilmSiteName,
} from '../constants/crawler_constants';

@Injectable()
export class ZarFilmJobsService {
  private readonly logger = new Logger(ZarFilmJobsService.name);

  constructor(private jobService: JobsService) {
    console.log('on job service zarfilm');
  }

  @Cron(CronExpression.EVERY_10_MINUTES)
  async siteIndexJob() {
    this.logger.debug('start crawling zarfilm.com ...');
    this.jobService.startSiteIndexJob(ZarFilmSiteName, ZarFilmBaseUrl);
  }

  @Cron(CronExpression.EVERY_5_SECONDS)
  async getMoviesDataJob() {
    this.logger.debug('start crawl from movie urls from zarfilm.com ...');
    this.jobService.startMovieJob(ZarFilmSiteName);
  }
}
