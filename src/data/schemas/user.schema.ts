import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type UserDocument = mongoose.HydratedDocument<UserModel>;

@Schema({ id: true, timestamps: true })
export class UserModel {
  id: string;

  @Prop()
  email: string;

  @Prop()
  phone_number: string;

  @Prop()
  refresh_token: string;
}

export const UserSchema = SchemaFactory.createForClass(UserModel);
UserSchema.virtual('id').get(function () {
  return this._id.toHexString();
});
