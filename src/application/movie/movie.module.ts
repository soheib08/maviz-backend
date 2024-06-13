import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ScheduleModule } from '@nestjs/schedule';
import { DataModule } from 'src/data/data.module';
import { MovieService } from './movie.service';
import { SearchService } from './search.service';
import { MoviesController } from './movie.controller';

@Module({
  controllers: [MoviesController],
  imports: [DataModule, HttpModule, ScheduleModule.forRoot()],
  providers: [MovieService, SearchService],
  exports: [SearchService, MovieService],
})
export class MovieModule {}
