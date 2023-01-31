import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ _id: false })
export class Harvest {
  @Prop({
    type: Number,
    required: true,
  })
  quantity: number;

  @Prop({
    type: Number,
    required: true,
  })
  weight: number;

  @Prop({
    type: Date,
    required: true,
  })
  date: Date;
}

export const HarvestSchema = SchemaFactory.createForClass(Harvest);
