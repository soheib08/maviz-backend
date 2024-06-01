import { MovieUrlDto } from 'src/core/dto/movie-url.dto';
import { Inject, Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { PaginationUrl } from 'src/core/models/crawler/pagination-url';
import { MovieUrl } from 'src/core/models/crawler/movie-url';
import { ISiteRepository } from 'src/core/interfaces/repository/crawler/ISite-repository';
import { IPaginationUrlRepository } from 'src/core/interfaces/repository/crawler/IPaginationUrl-repository';
import { IMovieUrlRepository } from 'src/core/interfaces/repository/crawler/IMovieUrl-repository';

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
  async handlePaginationUrlCreatedEvent(event: PaginationUrlCreatedEvent) {
    for await (const paginationItem of event.paginationUrls) {
      let foundPaginationUrl = await this.paginationUrlRepository.findOne(
        paginationItem,
      );
      if (!foundPaginationUrl) {
        let foundSite = await this.siteRepository.findOne(event.site);
        let newUrl = new PaginationUrl(paginationItem, foundSite['_id'], false);
        foundPaginationUrl = await this.paginationUrlRepository.createOne(
          newUrl,
        );
      }
    }
    for await (const movieUrlItem of event.movieUrls) {
      let isUrlExists = await this.movieUrlRepository.findOne(movieUrlItem.url);
      let foundPaginationUrl = await this.paginationUrlRepository.findOne(
        movieUrlItem.pagination_url,
      );
      if (!isUrlExists) {
        await this.movieUrlRepository.createOne(
          new MovieUrl(movieUrlItem.url, foundPaginationUrl['_id']),
        );
      }
    }
    await this.paginationUrlRepository.updateOne(
      event.movieUrls[0].pagination_url,
      {
        is_visited: true,
      },
    );
    console.log('pagination url saved');
  }
}
