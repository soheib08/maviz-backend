import { Site } from 'src/core/models/crawler/site';
import { IGenericRepository } from '../repository/generic-repository';

export interface ISiteRepository extends IGenericRepository<Site> {
  findOne(id: string): Promise<Site>;

  createOne(entity: Site): Promise<Site>;

  updateOne(id: string, entity: Site): void;

  find(): Promise<Site[]>;

  deleteOne(id: string): void;
}
export const ISiteRepository = Symbol('ISiteRepository');
