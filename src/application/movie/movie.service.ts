import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';

import { RawMovie } from 'src/core/models/crawler/raw-movie';
import { CreateMovieDto } from './dto/movie.dto';
import { IMovieRepository } from 'src/core/interfaces/repository/IMovie-repository';
import { Movie } from 'src/core/models/movie';

@Injectable()
export class MovieService implements OnModuleInit {
  private readonly logger = new Logger(MovieService.name);
  constructor(
    @Inject(IMovieRepository)
    private readonly movieRepository: IMovieRepository,
  ) {}

  async onModuleInit() {
    this.logger.debug('movie service registered');
  }

  async importMovie(rawMovie: RawMovie) {
    let movieDto = new CreateMovieDto(rawMovie);
    let movie = movieDto.createMovieInstance();

    let movieList = await this.movieRepository.find();
    let existingMovie = movieList.find((element) => {
      return element.name === movie.name;
    });
    if (
      !existingMovie ||
      existingMovie?.download_links.find(
        (element) => element.source_id.toString() !== rawMovie['_id'],
      )
    ) {
      await this.movieRepository.createOne(movie);
      console.log('new movie created', movie.name);
    } else {
      await this.addDownloadLinks(movieDto, existingMovie);
      await this.mergeMovies(existingMovie, movieDto);
      console.log(movie.name, 'is already exist and merged');
    }
  }

  async addDownloadLinks(rawMovie: CreateMovieDto, existingMovie: Movie) {
    existingMovie.download_links.push(...rawMovie.download_links);
    await this.movieRepository.updateOne(existingMovie.id, existingMovie);
  }

  async mergeMovies(movie: Movie, rawMovie: CreateMovieDto) {
    for (const key in rawMovie) {
      if (
        movie[key] === undefined ||
        movie[key] === null ||
        (Array.isArray(movie[key]) && movie[key].length === 0)
      ) {
        movie[key] = rawMovie[key];
      }
    }
    await this.movieRepository.updateOne(movie.id, movie);
  }
}
