import { Inject, Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { IRawMovieRepository } from 'src/core/interfaces/repository/crawler/IRawMovie-repository';
import { RawMovie } from 'src/core/models/crawler/raw-movie';

export class RawMovieCreatedEvent {
  constructor(public rawMovie: RawMovie, public movieUrl: string) {}
}

@Injectable()
export class RawMovieCreatedListener {
  constructor(
    @Inject(IRawMovieRepository)
    private rawMovieRepository: IRawMovieRepository,
  ) {}
  @OnEvent('rawMovie.created')
  async handleRawMovieCreatedEvent(event: RawMovieCreatedEvent) {
    let foundMovie = await this.rawMovieRepository.findOneByPaginationUrl(
      event.rawMovie.name,
      event.movieUrl,
    );
    console.log('=========raw movie status: ', !!foundMovie);
    event.rawMovie.base_url = event.movieUrl;
    if (!foundMovie) await this.rawMovieRepository.createOne(event.rawMovie);
  }
}
