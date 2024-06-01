import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RawMovie } from '../../schemas/crawler/raw-movie.schema';
import { IRawMovieRepository } from 'src/core/interfaces/repository/crawler/IRawMovie-repository';

@Injectable()
export class RawMovieRepository implements IRawMovieRepository {
  constructor(
    @InjectModel(RawMovie.name) private rawMovieModel: Model<RawMovie>,
  ) {}

  async createOne(entity: RawMovie) {
    const createdEntity = new this.rawMovieModel(entity);
    return createdEntity.save();
  }

  async find() {
    return await this.rawMovieModel.find().lean();
  }

  async findOne(name: string) {
    return await this.rawMovieModel.findOne({
      name: name,
    });
  }

  async findOneByPaginationUrl(
    name: string,
    movie_url: string,
  ): Promise<RawMovie> {
    return await this.rawMovieModel.findOne({
      name: name,
      base_url: movie_url,
    });
  }

  async updateOne(id: string, updatedEntityDto: Partial<RawMovie>) {
    return await this.rawMovieModel.updateOne(
      {
        _id: id,
      },
      {
        $set: {
          ...updatedEntityDto,
        },
      },
    );
  }

  async deleteOne(id: string) {
    return await this.rawMovieModel.deleteOne({
      _id: id,
    });
  }
}
