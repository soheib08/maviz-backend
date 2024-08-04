import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { JobsService } from '../services/jobs.service';
import {
  ZarFilmBaseUrl,
  ZarFilmSiteName,
} from '../constants/crawler_constants';
import { Crawler } from '../services/crawler.service';

@Injectable()
export class ZarFilmJobsService implements OnModuleInit {
  private readonly logger = new Logger(ZarFilmJobsService.name);

  constructor(private jobService: JobsService, private crawler: Crawler) {}

  async onModuleInit() {}

  // @Cron(CronExpression.EVERY_10_MINUTES)
  // async siteIndexJob() {
  //   this.logger.debug('start crawling zarfilm.com ...');
  //   this.jobService.startSiteIndexJob(ZarFilmSiteName, ZarFilmBaseUrl);
  // }

  // @Cron(CronExpression.EVERY_10_MINUTES)
  // async getMoviesDataJob() {
  //   this.logger.debug('start crawl from movie urls from zarfilm.com ...');
  //   this.jobService.startMovieJob(ZarFilmSiteName);
  // }
}
