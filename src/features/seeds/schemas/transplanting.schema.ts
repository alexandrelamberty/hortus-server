import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Transplanting extends Document {
  @Prop({ required: true })
  start: number;

  @Prop({ required: true })
  end: number;

  @Prop({ required: true })
  growth: number;
}
export const TransplantingSchema = SchemaFactory.createForClass(Transplanting);
