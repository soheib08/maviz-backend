import { Inject, Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { IRawMovieRepository } from 'src/core/interfaces/repository/crawler/IRawMovie-repository';
import { RawMovie } from 'src/core/models/crawler/raw-movie';

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