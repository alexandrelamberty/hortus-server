import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude, Expose } from 'class-transformer';
import { Document, Types } from 'mongoose';

export type UserDocument = User & Document;

export const GROUP_USER = 'group_user_details';
export const GROUP_ALL_USERS = 'group_all_users';

@Schema()
export class User {

  @Expose()
  _id: Types.ObjectId;

  // Unique no throwing good error
  /*@Prop({ type: String, required: false, unique: true })
  @Expose({ groups: [GROUP_USER, GROUP_ALL_USERS] })
  username: string;*/

  @Prop({ type: String, required: true, unique: true, lowercase: true })
  @Expose({ groups: [GROUP_USER] })
  email: string;

  // @Exclude({ toPlainOnly: true })
  @Prop({ type: String, required: true })
  password: string;

  /*
  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
  */
}

export const UserSchema = SchemaFactory.createForClass(User);
