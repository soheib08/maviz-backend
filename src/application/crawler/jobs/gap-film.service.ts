import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { GapFilmDataExtractorService } from '../services/gap-film-data-extractor.service';

@Injectable()
export class GapFilmJobsService {
  private readonly logger = new Logger(GapFilmJobsService.name);
  constructor(private extractor: GapFilmDataExtractorService) {}

  @Cron(CronExpression.EVERY_5_SECONDS)
  async siteIndexJob() {
    this.logger.debug('start crawling gap film...');
    // await this.extractor.crawler();
  }

  // @Cron(CronExpression.EVERY_MINUTE)
  // async getMoviesDataJob() {
  //   this.logger.debug('start crawl movie_urls from f2m...');
  //   this.jobService.startMovieJob(F2MSiteName);
  // }
}
