import { Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type UserDocument = User & Document;

// @Schema({
//   toJSON: {
//     virtuals: true,
//   },
// })
export class User {
  @Prop({ type: String, required: true, unique: true, lowercase: true })
  username: string;

  @Prop({ type: String, required: true, unique: true, lowercase: true })
  email: string;

  @Prop({ type: String, required: true })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

// UserSchema.virtual("fullName").get(function (this: UserDocument) {
//   return `${this.firstname} ${this.lastname}`;
// });
