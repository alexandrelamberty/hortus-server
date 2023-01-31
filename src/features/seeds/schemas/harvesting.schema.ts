import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Harvesting extends Document {
  @Prop({ required: true })
  start: number;

  @Prop({ required: true })
  end: number;

  @Prop({ required: true })
  duration: number;
}
export const HarvestingSchema = SchemaFactory.createForClass(Harvesting);
