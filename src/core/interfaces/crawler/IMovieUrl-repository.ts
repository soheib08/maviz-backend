import { MovieUrl } from 'src/core/models/crawler/movie-url';
import { IGenericRepository } from '../repository/generic-repository';

export interface IMovieUrlRepository extends IGenericRepository<MovieUrl> {
  findOne(id: string): Promise<MovieUrl>;

  createOne(entity: MovieUrl): Promise<MovieUrl>;

  updateOne(id: string, entity: Partial<MovieUrl>): Promise<void>;

  find(): Promise<MovieUrl[]>;

  findBySite(site: string): Promise<MovieUrl[]>;

  deleteOne(id: string): void;
}
export const IMovieUrlRepository = Symbol('IMovieUrlRepository');
