import { Inject, Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { RawMovie } from 'src/core/models/crawler/raw-movie';
import { IRawMovieRepository } from 'src/core/interfaces/repository/IRawMovie-repository';

export class RawMovieCreatedEvent {
  constructor(public rawMovie: RawMovie) {}
}

@Injectable()
export class RawMovieCreatedListener {
  constructor(
    @Inject(IRawMovieRepository)
    private rawMovieRepository: IRawMovieRepository,
  ) {}
  @OnEvent('rawMovie.created')
  async handleOrderCreatedEvent(event: RawMovieCreatedEvent) {
    let foundMovie = await this.rawMovieRepository.findOne(event.rawMovie.name);
    if (!foundMovie) await this.rawMovieRepository.createOne(event.rawMovie);
  }
}
