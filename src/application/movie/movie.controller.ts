import { Controller, Get, Param } from '@nestjs/common';
import { MovieService } from './movie.service';

@Controller('movies')
export class MoviesController {
  constructor(private readonly movieService: MovieService) {}

  @Get('')
  async getMovies() {
    let res = await this.movieService.getMovies();
    res.forEach((movie) => {
      movie.download_links = movie.download_links.map((e: any) => {
        return {
          source_id: e.source_id.site.name,
          links: e.links,
        };
      });
    });

    return res;
  }
}
