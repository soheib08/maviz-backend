import { RawMovie } from 'src/data/schemas/crawler/raw-movie.schema';
import { IGenericRepository } from '../repository/generic-repository';

export interface IRawMovieRepository extends IGenericRepository<RawMovie> {
  findOne(id: string): Promise<RawMovie>;

  findOneByPaginationUrl(id: string, movie_url: string): Promise<RawMovie>;

  createOne(entity: RawMovie): Promise<RawMovie>;

  updateOne(id: string, entity: RawMovie): void;

  find(): Promise<RawMovie[]>;

  deleteOne(id: string): void;
}
export const IRawMovieRepository = Symbol('IRawMovieRepository');
