import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { F2MCrawler } from './f2m-crawler.service';
import { IMovieUrlRepository } from 'src/core/interfaces/repository/IMovieUrl-repository';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';
import { IPaginationUrlRepository } from 'src/core/interfaces/repository/IPaginationUrl-repository';
import { ISiteRepository } from 'src/core/interfaces/repository/ISite-repository';
import { F2MUrl } from '../constants/f2m.constants';
import { Site } from 'src/core/models/site';
import { PaginationUrl } from 'src/core/models/pagination-url';

@Injectable()
export class F2MJobsService {
  private readonly logger = new Logger(F2MJobsService.name);
  constructor(
    @Inject(IMovieUrlRepository)
    private readonly movieUrlRepository: IMovieUrlRepository,
    @Inject(IPaginationUrlRepository)
    private readonly paginationUrlRepository: IPaginationUrlRepository,
    @Inject(ISiteRepository) private readonly siteRepository: ISiteRepository,
    @InjectQueue('urlQueue') private urlQueue: Queue,
    @InjectQueue('movieQueue') private movieQueue: Queue,
  ) {}

  // @Cron(CronExpression.EVERY_MINUTE)
  // async siteIndexJob() {
  //   this.logger.debug('start crawling f2m...');
  //   let foundSite = await this.getSiteData();
  //   let paginationUrlsToProcess = await this.getUnvisitedPaginationUrls();

  //   paginationUrlsToProcess.forEach((element) =>
  //     this.addUrlToQueue(element.url, foundSite.name),
  //   );
  // }

  @Cron(CronExpression.EVERY_SECOND)
  async getMoviesDataJob() {
    this.logger.debug('start crawl from movie urls...');
    let foundMovieLinks = await this.movieUrlRepository.find();

    foundMovieLinks.forEach((element) => this.addMovieToQueue(element.url));
  }

  private async addUrlToQueue(url: string, site: string) {
    await this.urlQueue.add('processUrl', { url, site });
  }

  private async addMovieToQueue(url: string) {
    await this.movieQueue.add('processMovie', { url });
  }

  private async getUnvisitedPaginationUrls() {
    let unvisitedUrls = await this.paginationUrlRepository.find();
    return unvisitedUrls.filter((element) => {
      return element.is_visited === false;
    });
  }

  async getSiteData() {
    let foundSite = await this.siteRepository.findOne(F2MUrl);
    if (!foundSite) {
      let siteName = F2MUrl.split('https://www.')[1].split('.')[0];
      foundSite = await this.siteRepository.createOne(
        new Site(F2MUrl, siteName),
      );
    }
    let isSiteBaseUrlExists = await this.paginationUrlRepository.findOne(
      F2MUrl,
    );
    if (!isSiteBaseUrlExists) {
      let newUrl = new PaginationUrl(F2MUrl, foundSite.id, false);
      await this.paginationUrlRepository.createOne(newUrl);
    }

    return foundSite;
  }
}
