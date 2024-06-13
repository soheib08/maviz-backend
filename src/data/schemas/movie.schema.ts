import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type MovieDocument = mongoose.HydratedDocument<Movie>;
@Schema()
export class MovieDownloadLinkModel {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'PaginationUrl' })
  source_id: string;

  @Prop()
  links: Array<string>;
}

export const DownloadLinkSchema = SchemaFactory.createForClass(
  MovieDownloadLinkModel,
);

@Schema({ id: true, timestamps: true })
export class Movie {
  @Prop()
  id: string;

  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  genre: Array<string>;

  @Prop()
  languages: Array<string>;

  @Prop()
  qualities: Array<string>;

  @Prop()
  countries: Array<string>;

  @Prop()
  stars: Array<string>;

  @Prop()
  directors: Array<string>;

  @Prop()
  images: Array<string>;

  @Prop({ type: [DownloadLinkSchema] })
  download_links: Array<MovieDownloadLinkModel>;

  @Prop()
  date: string;

  @Prop()
  imdb_score: string;

  @Prop()
  rotten_score: string;

  @Prop()
  video_links: Array<string>;
}

export const MovieSchema = SchemaFactory.createForClass(Movie);
