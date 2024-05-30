import { Inject, Injectable, Logger } from '@nestjs/common';
import { IMovieUrlRepository } from 'src/core/interfaces/repository/IMovieUrl-repository';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';
import { IPaginationUrlRepository } from 'src/core/interfaces/repository/IPaginationUrl-repository';
import { ISiteRepository } from 'src/core/interfaces/repository/ISite-repository';
import { Site } from 'src/core/models/crawler/site';
import { PaginationUrl } from 'src/core/models/crawler/pagination-url';
import { Cron, CronExpression } from '@nestjs/schedule';
import { is } from 'cheerio/lib/api/traversing';

@Injectable()
export class ZarFilmJobsService {
  private readonly logger = new Logger(ZarFilmJobsService.name);
  constructor(
    @Inject(IMovieUrlRepository)
    private readonly movieUrlRepository: IMovieUrlRepository,
    @Inject(IPaginationUrlRepository)
    private readonly paginationUrlRepository: IPaginationUrlRepository,
    @Inject(ISiteRepository) private readonly siteRepository: ISiteRepository,
    @InjectQueue('ZarUrlQueue') private urlQueue: Queue,
    @InjectQueue('ZarMovieQueue') private movieQueue: Queue,
  ) {}

  @Cron(CronExpression.EVERY_MINUTE)
  async siteIndexJob() {
    this.logger.debug('start crawling zarfilm.com ...');
    let foundSite = await this.getSiteData();
    let paginationUrlsToProcess = await this.getUnvisitedPaginationUrls(
      foundSite['_id'],
    );
    console.log(paginationUrlsToProcess);

    paginationUrlsToProcess.forEach((element) =>
      this.addUrlToQueue(element.url, foundSite.name),
    );
  }

  // @Cron(CronExpression.EVERY_10_MINUTES)
  // async getMoviesDataJob() {
  //   this.logger.debug('start crawl from movie urls...');
  //   let foundMovieLinks = await this.movieUrlRepository.find();

  //   foundMovieLinks.forEach((element) => this.addMovieToQueue(element.url));
  // }

  private async addUrlToQueue(url: string, site: string) {
    await this.urlQueue.add('processUrl', { url, site });
  }

  private async addMovieToQueue(url: string) {
    await this.movieQueue.add('processMovie', { url });
  }

  private async getUnvisitedPaginationUrls(site: string) {
    let unvisitedUrls = await this.paginationUrlRepository.findBySite(site);
    return unvisitedUrls.filter((element) => {
      return element.is_visited === false;
    });
  }

  async getSiteData() {
    let ZarFilmMUrl = 'https://zarfilm.com/all-movie/';
    let foundSite = await this.siteRepository.findOne('zarfilm');
    if (!foundSite) {
      let siteName = ZarFilmMUrl.split('https://')[1].split('.')[0];
      foundSite = await this.siteRepository.createOne(
        new Site(ZarFilmMUrl, siteName),
      );
    }
    let isSiteBaseUrlExists = await this.paginationUrlRepository.findOne(
      ZarFilmMUrl,
    );
    if (!isSiteBaseUrlExists) {
      let newUrl = new PaginationUrl(
        ZarFilmMUrl,
        foundSite['_id'].toString(),
        false,
      );
      await this.paginationUrlRepository.createOne(newUrl);
    }

    return foundSite;
  }
}
