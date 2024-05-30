import { HttpService } from '@nestjs/axios';
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ZarFilmDataExtractor } from './zarfilm-data-extractor.service';
import { MovieUrlDto } from 'src/core/dto/movie-url.dto';

@Injectable()
export class ZarFilmService implements OnModuleInit {
  private readonly logger = new Logger(ZarFilmService.name);
  constructor(private readonly httpService: HttpService) {}

  async onModuleInit() {
    // this.crawlPaginationUrl('https://zarfilm.com/all-movie/');
  }

  async crawlPaginationUrl(currentPaginationUrl: string) {
    const movieUrls = new Array<MovieUrlDto>();
    let paginationUrls = new Array<string>();
    console.log('current paginate url', currentPaginationUrl);
    const data = await this.getUrlData(currentPaginationUrl);

    const dataExtractor = new ZarFilmDataExtractor(data);
    paginationUrls = dataExtractor.getPaginationUrlList();
    const movieUrlsList = dataExtractor.getPaginationUrlMovieList();
    movieUrlsList.forEach((movieUrl) => {
      movieUrls.push({ url: movieUrl, pagination_url: currentPaginationUrl });
    });

    this.logger.debug(
      '========pagination url data  extracted=======',
      movieUrls,
      paginationUrls,
    );
    return { movieUrls, paginationUrls };
  }

  async getUrlData(url: string): Promise<any> {
    try {
      const response = await this.httpService.axiosRef.get(url);

      return response.data;
    } catch (err) {
      console.log('error in get request', err);
    }
  }
}
