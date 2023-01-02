import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Planting {
  @Prop({ required: true })
  start: number;

  @Prop({ required: true })
  end: number;

  @Prop({ required: true })
  maturity: number;
}
export const PlantingSchema = SchemaFactory.createForClass(Planting);
