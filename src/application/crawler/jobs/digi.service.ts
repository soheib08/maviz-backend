import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { JobsService } from '../services/jobs.service';
import { DigiSiteName } from '../constants/crawler_constants';
import { Crawler } from '../services/crawler.service';

@Injectable()
export class DigiJobsService {
  private readonly logger = new Logger(DigiJobsService.name);
  headers: {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36';
    Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7';
    'Accept-Language': 'en-US,en;q=0.9,fa;q=0.8';
    Connection: 'keep-alive';
    'Upgrade-Insecure-Requests': '1';
    Referer: 'https://digimoviez.com/'; // Adjust the referer if necessary
    'Content-Type': 'text/html; charset=UTF-8';
    Cookie: `_ga=GA1.1.674846709.1692471220; cf_clearance=h7QInyfbuuP7D9cJfSBLdgTzxqVuk2IGmvWOd72ssXc-1703080472-0-1-6783e3e3.226aff2a.69caa48c-0.2.1703080472; wordpress_logged_in_d13b2bed21d03305436be5f427acb040=Nasim1376%7C1718499012%7CKT9z86xI4EequdkrwU4ExJeL1plzVqOmIGSyOwaDTw4%7Ced67e0868dbb369f39b62d657d41a40b9bf81e8df4e444f2bb3c14502a0c2ac0; _ga_T17SR0XS0N=GS1.1.1718147186.126.1.1718147201.45.0.0; _ga_GMNLPTLZ7F=GS1.1.1718147186.119.1.1718147201.0.0.0`; // Set your cookies here
  };

  constructor(private jobService: JobsService, private crawler: Crawler) {}

  // @Cron(CronExpression.EVERY_MINUTE)
  // async siteIndexJob() {
  //   this.logger.debug('start crawling digimoviz.com ...');
  //   this.jobService.startSiteIndexJob(DigiSiteName, DigiBaseUrl, this.headers);
  // }

  // @Cron(CronExpression.EVERY_5_SECONDS)
  // async getMoviesDataJob() {
  //   this.logger.debug('start crawl from movie urls from zarfilm.com ...');
  //   this.jobService.startMovieJob(DigiSiteName);
  // }
}
