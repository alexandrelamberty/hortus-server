import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Model, Schema as MongooseSchema } from "mongoose";
import { Roles } from "../../auth/decorators/roles.decorator";

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  id: string;

  @Prop({ type: String, required: true })
  email: string;

  @Prop({ type: String, required: true })
  password: string;

  roles!: [];
}

export const UserSchema = SchemaFactory.createForClass(User);
