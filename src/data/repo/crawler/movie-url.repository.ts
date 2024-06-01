import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IMovieUrlRepository } from 'src/core/interfaces/repository/crawler/IMovieUrl-repository';
import { MovieUrl } from 'src/data/schemas/crawler/movie-url.schema';

@Injectable()
export class MovieUrlRepository implements IMovieUrlRepository {
  constructor(
    @InjectModel(MovieUrl.name) private movieUrlModel: Model<MovieUrl>,
  ) {}
  async createOne(entity: MovieUrl) {
    const createdEntity = new this.movieUrlModel(entity);
    return createdEntity.save();
  }

  async find() {
    return await this.movieUrlModel
      .find({ $or: [{ is_visited: false }, { is_visited: null }] })
      .lean();
  }

  async findOne(url: string) {
    return await this.movieUrlModel.findOne({
      url,
    });
  }

  async updateOne(id: string, movieUrl: Partial<MovieUrl>) {
    await this.movieUrlModel.updateOne(
      {
        url: id,
      },
      {
        $set: {
          ...movieUrl,
        },
      },
    );
  }

  async deleteOne(id: string) {
    return await this.movieUrlModel.deleteOne({
      _id: id,
    });
  }
}
