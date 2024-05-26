import { Movie } from 'src/core/models/movie';

export class DownloadMovieDto {
  public title: string;
  public description: string;
  public imageBuffer: Buffer;
  public links: { text: string; url: string }[];
  constructor(
    movie: Movie,
    thumbnailBuffer: Buffer,
    links: { text: string; url: string }[],
  ) {
    this.title = movie.name;
    this.description = movie.description;
    this.imageBuffer = thumbnailBuffer;
    this.links = links;
  }
}
