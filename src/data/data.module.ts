import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Site, SiteSchema } from './schemas/crawler/site.schema';
import {
  PaginationUrl,
  PaginationUrlSchema,
} from './schemas/crawler/pagination-url.schema';
import { MovieUrl, MovieUrlSchema } from './schemas/crawler/movie-url.schema';
import { Movie, MovieSchema } from './schemas/movie.schema';
import { SiteRepository } from './repo/crawler/site.repository';
import { PaginationUrlRepository } from './repo/crawler/pagination-url.repository';
import { MovieUrlRepository } from './repo/crawler/movie-url.repository';
import { MovieRepository } from './repo/movie.repository';
import { RawMovieRepository } from './repo/crawler/raw-movie.repository';
import { RawMovie, RawMovieSchema } from './schemas/crawler/raw-movie.schema';
import { UserSchema } from './schemas/user.schema';
import { UserRepository } from './repo/user.repository';
import { IUserRepository } from 'src/core/interfaces/repository/user-repository';
import { IMovieRepository } from 'src/core/interfaces/repository/IMovie-repository';
import { IRawMovieRepository } from 'src/core/interfaces/crawler/IRawMovie-repository';
import { IMovieUrlRepository } from 'src/core/interfaces/crawler/IMovieUrl-repository';
import { IPaginationUrlRepository } from 'src/core/interfaces/crawler/IPaginationUrl-repository';
import { ISiteRepository } from 'src/core/interfaces/crawler/ISite-repository';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://mongodb:27017/movie-crawler'),
    MongooseModule.forFeature([
      { name: Site.name, schema: SiteSchema },
      { name: PaginationUrl.name, schema: PaginationUrlSchema },
      { name: MovieUrl.name, schema: MovieUrlSchema },
      { name: Movie.name, schema: MovieSchema },
      { name: RawMovie.name, schema: RawMovieSchema },
      { name: 'User', schema: UserSchema },
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
