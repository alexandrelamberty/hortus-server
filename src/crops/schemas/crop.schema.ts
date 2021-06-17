import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CropDocument = Crop & Document;

@Schema()
export class Crop {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  family: string;

  @Prop({ required: true })
  genus: string;

  @Prop()
  seeding: number[];

  @Prop()
  transplanting: number[];

  @Prop()
  planting: number[];

  @Prop()
  harvesting: number[];

  @Prop()
  description: string;
}

export const CropSchema = SchemaFactory.createForClass(Crop);
