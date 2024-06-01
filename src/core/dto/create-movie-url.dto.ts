import { PaginationUrl } from 'src/data/schemas/crawler/pagination-url.schema';

export class CreateMovieUrlDto {
  url: string;
  pagination_url: PaginationUrl;
}
