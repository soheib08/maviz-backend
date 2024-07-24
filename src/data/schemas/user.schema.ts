import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type UserDocument = mongoose.HydratedDocument<UserModel>;

@Schema({ id: true, timestamps: true })
export class UserModel {
  @Prop()
  id: string;

  @Prop()
  telegramUsername: string;
}

export const UserSchema = SchemaFactory.createForClass(UserModel);
