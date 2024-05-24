import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Site, SiteSchema } from './schemas/site.schema';
import {
  PaginationUrl,
  PaginationUrlSchema,
} from './schemas/pagination-url.schema';
import { MovieUrl, MovieUrlSchema } from './schemas/movie-url.schema';
import { Movie, MovieSchema } from './schemas/movie.schema';
import { SiteRepository } from './repo/site.repository';
import { PaginationUrlRepository } from './repo/pagination-url.repository';
import { MovieUrlRepository } from './repo/movie-url.repository';
import { MovieRepository } from './repo/movie.repository';
import { RawMovieRepository } from './repo/raw-movie.repository';
import { RawMovie, RawMovieSchema } from './schemas/raw-movie.schema';
import { User, UserSchema } from './schemas/user.schema';
import { UserRepository } from './repo/user.repository';
import { IUserRepository } from 'src/core/interfaces/repository/user-repository.interface';
import { IRawMovieRepository } from 'src/core/interfaces/repository/IRawMovie-repository';
import { IMovieRepository } from 'src/core/interfaces/repository/IMovie-repository';
import { IMovieUrlRepository } from 'src/core/interfaces/repository/IMovieUrl-repository';
import { IPaginationUrlRepository } from 'src/core/interfaces/repository/IPaginationUrl-repository';
import { ISiteRepository } from 'src/core/interfaces/repository/ISite-repository';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/movie-crawler'),
    MongooseModule.forFeature([
      { name: Site.name, schema: SiteSchema },
      { name: PaginationUrl.name, schema: PaginationUrlSchema },
      { name: MovieUrl.name, schema: MovieUrlSchema },
      { name: Movie.name, schema: MovieSchema },
      { name: RawMovie.name, schema: RawMovieSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  providers: [
    {
      provide: IMovieRepository,
      useClass: MovieRepository,
    },
    {
      provide: IRawMovieRepository,
      useClass: RawMovieRepository,
    },
    {
      provide: IMovieUrlRepository,
      useClass: MovieUrlRepository,
    },
    {
      provide: IPaginationUrlRepository,
      useClass: PaginationUrlRepository,
    },
    {
      provide: ISiteRepository,
      useClass: SiteRepository,
    },
    {
      provide: IUserRepository,
      useClass: UserRepository,
    },
  ],
  exports: [
    ISiteRepository,
    IPaginationUrlRepository,
    IMovieUrlRepository,
    IMovieRepository,
    IRawMovieRepository,
    IUserRepository,
  ],
})
export class DataModule {}
