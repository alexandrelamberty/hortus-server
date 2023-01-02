import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Transplanting {
  @Prop({ required: true })
  start: number;

  @Prop({ required: true })
  end: number;

  @Prop({ required: true })
  growth: number;
}
export const TransplantingSchema = SchemaFactory.createForClass(Transplanting);
