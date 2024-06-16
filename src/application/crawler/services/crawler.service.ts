import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ICrawler } from 'src/core/interfaces/crawler.interface';
import { MovieUrlDto } from 'src/core/dto/movie-url.dto';
import { RawMovie } from 'src/core/models/crawler/raw-movie';
import { IDataExtractor } from 'src/core/interfaces/data-extractor.interface';

@Injectable()
export class Crawler implements ICrawler {
  private readonly logger = new Logger(Crawler.name);
  constructor(private readonly httpService: HttpService) {}

  async crawlPaginationUrl(
    currentPaginationUrl: string,
    dataExtractor: IDataExtractor,
    headers: [] = null,
  ) {
    const movieUrls = new Array<MovieUrlDto>();
    let paginationUrls = new Array<string>();
    console.log('current paginate url', currentPaginationUrl);
    const data = await this.getUrlData(currentPaginationUrl, headers);
    dataExtractor.loadData(data);

    paginationUrls = dataExtractor.getPaginationUrlList().filter((e) => !!e);
    const movieUrlsList = dataExtractor.getPaginationUrlMovieList();
    movieUrlsList.forEach((movieUrl) => {
      !!movieUrl &&
        movieUrls.push({ url: movieUrl, pagination_url: currentPaginationUrl });
    });
    this.logger.debug('========pagination url data  extracted=======');
    return { movieUrls, paginationUrls };
  }

  async getMovieInformation(movieUrl: string, dataExtractor: IDataExtractor) {
    let movie = new RawMovie();
    const data = await this.getUrlData(movieUrl);
    dataExtractor.loadData(data);
    //get movie name
    movie.name = dataExtractor.getMovieTitle();

    //get movie genres
    movie.genre = dataExtractor.getMovieGenres();
    console.log('done');

    return movie;
  }

  async crawlMovieUrl(
    movieUrl: string,
    dataExtractor: IDataExtractor,
  ): Promise<RawMovie> {
    let movie = await this.getMovieInformation(movieUrl, dataExtractor);
    return movie;
  }

  async getUrlData(url: string, headers: any = null): Promise<any> {
    try {
      const response = await this.httpService.axiosRef.get(url, { headers });

      return response.data;
    } catch (err) {
      console.log('error in get request', err);
    }
  }
}
