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
  ) {
    const movieUrls = new Array<MovieUrlDto>();
    let paginationUrls = new Array<string>();
    console.log('current paginate url', currentPaginationUrl);
    const data = await this.getUrlData(currentPaginationUrl);
    dataExtractor.loadData(data);

    paginationUrls = dataExtractor.getPaginationUrlList();
    const movieUrlsList = dataExtractor.getPaginationUrlMovieList();
    movieUrlsList.forEach((movieUrl) => {
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

    //get scores
    movie.imdb_score = dataExtractor.getMovieIMScore();

    movie.rotten_score = dataExtractor.getMovieRottenScore();

    //get movie language
    movie.languages = dataExtractor.getMovieLanguages();

    //qualities
    movie.qualities = dataExtractor.getMovieQualities();

    //get countries
    movie.countries = dataExtractor.getMovieCountries();

    //get stars
    movie.stars = dataExtractor.getMovieStars();

    //get directors
    movie.directors = dataExtractor.getMovieDirectors();

    //get posters
    movie.images = dataExtractor.getMoviePosters();

    //get download links
    movie.download_links = dataExtractor.getMovieDownloadLinks();

    //get movie description
    movie.description = dataExtractor.getMovieDescription();

    //get movie date
    movie.date = dataExtractor.getMovieDate();

    //get video links
    movie.video_links = dataExtractor.getMovieVideoLinks();

    return movie;
  }

  async crawlMovieUrl(
    movieUrl: string,
    dataExtractor: IDataExtractor,
  ): Promise<RawMovie> {
    let movie = await this.getMovieInformation(movieUrl, dataExtractor);
    return movie;
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
