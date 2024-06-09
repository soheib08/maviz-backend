import { Inject, Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { IMovieUrlRepository } from 'src/core/interfaces/repository/crawler/IMovieUrl-repository';

export class MovieUrlUpdatedEvent {
  constructor(public movieUrl: string) {}
}

@Injectable()
export class MovieUrlUpdatedEventListener {
  constructor(
    @Inject(IMovieUrlRepository)
    private movieUrlRepository: IMovieUrlRepository,
  ) {}
  @OnEvent('movieUrl.updated')
  async handleOrderCreatedEvent(event: MovieUrlUpdatedEvent) {
    await this.movieUrlRepository.updateOne(event.movieUrl.toString(), {
      is_visited: true,
    });
    console.log('movie url updated', event.movieUrl);
  }
}
