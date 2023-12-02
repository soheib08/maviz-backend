import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type UserDocument = mongoose.HydratedDocument<User>;

@Schema({ id: true, timestamps: true })
export class User {
  @Prop()
  id: string;

  @Prop()
  telegramUsername: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
