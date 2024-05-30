import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ICrawler } from 'src/core/interfaces/crawler.interface';
import { F2MDataExtractor } from './f2m-data-extractor.service';
import { MovieUrlDto } from 'src/core/dto/movie-url.dto';
import { RawMovie } from 'src/core/models/crawler/raw-movie';

@Injectable()
export class F2MCrawler implements ICrawler {
  private readonly logger = new Logger(F2MCrawler.name);
  constructor(private readonly httpService: HttpService) {}

  async crawlPaginationUrl(currentPaginationUrl: string) {
    const movieUrls = new Array<MovieUrlDto>();
    let paginationUrls = new Array<string>();
    console.log('current paginate url', currentPaginationUrl);
    const data = await this.getUrlData(currentPaginationUrl);

    const dataExtractor = new F2MDataExtractor(data);
    paginationUrls = dataExtractor.getPaginationUrlList();
    const movieUrlsList = dataExtractor.getPaginationUrlMovieList();
    movieUrlsList.forEach((movieUrl) => {
      movieUrls.push({ url: movieUrl, pagination_url: currentPaginationUrl });
    });

    this.logger.debug('========pagination url data  extracted=======');
    return { movieUrls, paginationUrls };
  }

  async getMovieInformation(movieUrl: string) {
    let movie = new RawMovie();
    const data = await this.getUrlData(movieUrl);
    let dataExtractor = new F2MDataExtractor(data);

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

  async crawlMovieUrl(movieUrl: string): Promise<RawMovie> {
    let movie = await this.getMovieInformation(movieUrl);
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
