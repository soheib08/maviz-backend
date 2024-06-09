import { Inject, Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { MovieService } from 'src/application/movie/movie.service';
import { IRawMovieRepository } from 'src/core/interfaces/repository/crawler/IRawMovie-repository';
import { IMovieRepository } from 'src/core/interfaces/repository/IMovie-repository';
import { RawMovie } from 'src/core/models/crawler/raw-movie';

export class RawMovieCreatedEvent {
  constructor(public rawMovie: RawMovie, public movieUrl: string) {}
}

@Injectable()
export class RawMovieCreatedListener {
  constructor(
    @Inject(IRawMovieRepository)
    private rawMovieRepository: IRawMovieRepository,
    @Inject(IMovieRepository)
    private movieRepository: IMovieRepository,
    private movieService: MovieService,
  ) {}
  @OnEvent('rawMovie.created')
  async handleOrderCreatedEvent(event: RawMovieCreatedEvent) {
    let foundRawMovie = await this.rawMovieRepository.findOneByPaginationUrl(
      event.rawMovie.name,
      event.movieUrl,
    );
    console.log('raw movie status: ', !!foundRawMovie);
    event.rawMovie.base_url = event.movieUrl;
    if (!foundRawMovie) await this.rawMovieRepository.createOne(event.rawMovie);

    const foundMovie = await this.movieRepository.findOne(event.rawMovie.name);
    if (!foundMovie) await this.movieService.importMovie(event.rawMovie);
  }
}
