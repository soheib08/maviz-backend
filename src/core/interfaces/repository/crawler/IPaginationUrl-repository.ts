import { PaginationUrl } from 'src/core/models/crawler/pagination-url';
import { IGenericRepository } from '../generic-repository';

export interface IPaginationUrlRepository
  extends IGenericRepository<PaginationUrl> {
  findOne(id: string): Promise<PaginationUrl>;

  createOne(entity: PaginationUrl): Promise<PaginationUrl>;

  updateOne(id: string, entity: Partial<PaginationUrl>): void;

  find(): Promise<PaginationUrl[]>;

  findBySite(site: string): Promise<PaginationUrl[]>;

  deleteOne(id: string): void;
}

export const IPaginationUrlRepository = Symbol('IPaginationUrlRepository');
