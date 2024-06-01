import { Site } from 'src/data/schemas/crawler/site.schema';

export class CreatePaginationUrlDto {
  url: string;
  site: Site;
}
