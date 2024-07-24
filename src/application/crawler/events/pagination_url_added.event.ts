import { MovieUrlDto } from 'src/core/dto/movie-url.dto';
import { Inject, Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { PaginationUrl } from 'src/core/models/crawler/pagination-url';
import { MovieUrl } from 'src/core/models/crawler/movie-url';
import { ISiteRepository } from 'src/core/interfaces/crawler/ISite-repository';
import { IPaginationUrlRepository } from 'src/core/interfaces/crawler/IPaginationUrl-repository';
import { IMovieUrlRepository } from 'src/core/interfaces/crawler/IMovieUrl-repository';

export class PaginationUrlCreatedEvent {
  constructor(
    public paginationUrls: Array<string>,
    public movieUrls: Array<MovieUrlDto>,
    public site: string,
  ) {}
}

@Injectable()
export class PaginationUrlCreatedListener {
  constructor(
    @Inject(ISiteRepository) private siteRepository: ISiteRepository,
    @Inject(IPaginationUrlRepository)
    private paginationUrlRepository: IPaginationUrlRepository,
    @Inject(IMovieUrlRepository)
    private movieUrlRepository: IMovieUrlRepository,
  ) {}
  @OnEvent('paginationUrl.created')
  async handleOrderCreatedEvent(event: PaginationUrlCreatedEvent) {
    for await (const paginationItem of event.paginationUrls) {
      let foundPaginationUrl = await this.paginationUrlRepository.findOne(
        paginationItem,
      );
      if (!foundPaginationUrl) {
        let foundSite = await this.siteRepository.findOne(event.site);
        let newUrl = new PaginationUrl(paginationItem, foundSite['_id'], true);
        console.log('pagination url added: ', newUrl.url);
        foundPaginationUrl = await this.paginationUrlRepository.createOne(
          newUrl,
        );
      }
    }
    for await (const movieUrlItem of event.movieUrls) {
      const isUrlExists = await this.movieUrlRepository.findOne(
        movieUrlItem.url,
      );
      const foundPaginationUrl = await this.paginationUrlRepository.findOne(
        movieUrlItem.pagination_url,
      );
      if (!isUrlExists) {
        const movieUrl = await this.movieUrlRepository.createOne(
          new MovieUrl(movieUrlItem.url, foundPaginationUrl['_id']),
        );
        console.log('movie url added: ', movieUrl.url);
      }
    }
    await this.paginationUrlRepository.updateOne(
      event.movieUrls[0].pagination_url,
      {
        is_visited: true,
      },
    );
    console.log('pagination url updated: ', event.movieUrls[0].pagination_url);
  }
}
