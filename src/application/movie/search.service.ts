import { Inject, Injectable, Logger } from '@nestjs/common';
import { IMovieRepository } from 'src/core/interfaces/repository/IMovie-repository';
import { Movie } from 'src/core/models/movie';

@Injectable()
export class SearchService {
  private readonly logger = new Logger(SearchService.name);
  constructor(
    @Inject(IMovieRepository)
    private readonly movieRepository: IMovieRepository,
  ) {}

  async getMovieDetail(name: string) {
    let movieList = await this.movieRepository.find();
    return movieList.find((element) => element.name === name);
  }

  async search(searchTerm: string): Promise<Movie[]> {
    let movieList = await this.movieRepository.find();
    let similarMovies = this.findSimilarMovies(searchTerm, movieList);
    return similarMovies;
  }

  private findSimilarMovies(searchTerm: string, movieList: Movie[]): Movie[] {
    const similarMovies = movieList.filter((movie) => {
      return movie.name.match(searchTerm);
    });

    return similarMovies;
  }
}
