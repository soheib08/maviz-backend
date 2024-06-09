import { Inject, Injectable, Logger } from '@nestjs/common';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';
import { Site } from 'src/core/models/crawler/site';
import { PaginationUrl } from 'src/core/models/crawler/pagination-url';
import { IPaginationUrlRepository } from 'src/core/interfaces/repository/crawler/IPaginationUrl-repository';
import { IMovieUrlRepository } from 'src/core/interfaces/repository/crawler/IMovieUrl-repository';
import { ISiteRepository } from 'src/core/interfaces/repository/crawler/ISite-repository';

@Injectable()
export class JobsService {
  private readonly logger = new Logger(JobsService.name);
  constructor(
    @Inject(IMovieUrlRepository)
    private readonly movieUrlRepository: IMovieUrlRepository,
    @Inject(IPaginationUrlRepository)
    private readonly paginationUrlRepository: IPaginationUrlRepository,
    @Inject(ISiteRepository) private readonly siteRepository: ISiteRepository,
    @InjectQueue('urlQueue') private urlQueue: Queue,
    @InjectQueue('movieQueue') private movieQueue: Queue,
  ) {}

  async startSiteIndexJob(site: string, url: string) {
    let foundSite = await this.getSiteData(site, url);
    let paginationUrlsToProcess = await this.getPaginationUrls(
      foundSite['_id'],
    );
    paginationUrlsToProcess = paginationUrlsToProcess.slice(0, 20);
    paginationUrlsToProcess.forEach((element) =>
      this.addUrlToQueue(element.url, foundSite.name),
    );
  }

  async startMovieJob(site: string) {
    let foundSite = await this.getSiteData(site);
    const foundMovieLinks = await this.getMovieUrls(foundSite['_id']);
    foundMovieLinks.forEach((element) => {
      this.addMovieToQueue(element.url, element['_id']);
    });
  }

  private async getMovieUrls(site: string) {
    let urls = await this.movieUrlRepository.findBySite(site);
    //return 10 url in each iterate
    return urls.slice(0, 10);
  }

  private async getPaginationUrls(site: string) {
    let unvisitedUrls = await this.paginationUrlRepository.findBySite(site);
    //return 20 url in each iterate

    return unvisitedUrls
      .filter((element) => {
        return element.is_visited === false;
      })
      .slice(0, 20);
  }

  private async addUrlToQueue(url: string, site: string) {
    await this.urlQueue.add('processUrl', { url, site });
  }

  private async addMovieToQueue(url: string, movie_url: string) {
    await this.movieQueue.add('processMovie', { url, movie_url });
  }

  private async getSiteData(site: string, base_url: string = null) {
    let foundSite = await this.siteRepository.findOne(site);
    if (!foundSite) {
      foundSite = await this.siteRepository.createOne(new Site(base_url, site));
    }
    if (base_url) {
      let isSiteBaseUrlExists = await this.paginationUrlRepository.findOne(
        base_url,
      );
      if (!isSiteBaseUrlExists) {
        let newUrl = new PaginationUrl(
          base_url,
          foundSite['_id'].toString(),
          false,
        );
        await this.paginationUrlRepository.createOne(newUrl);
      }
    }

    return foundSite;
  }
}
