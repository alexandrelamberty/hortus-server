import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PlantDocument = Plant & Document;

@Schema()
export class Plant {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  family: string;

  @Prop({ type: String, required: true })
  genus: string;

  @Prop({ type: String, required: true })
  description: string;

  @Prop()
  type: string;

  @Prop()
  image: string;

  @Prop()
  seeding: number[];

  @Prop()
  transplanting: number[];

  @Prop()
  planting: number[];

  @Prop()
  harvesting: number[];

  @Prop()
  spacing: number;

  @Prop()
  rows: number;

}

export const PlantSchema = SchemaFactory.createForClass(Plant);
