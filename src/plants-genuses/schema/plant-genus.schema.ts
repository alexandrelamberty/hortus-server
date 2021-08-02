import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PlantGenusDocument = PlantGenus & Document;

@Schema()
export class PlantGenus {
  @Prop({ type: String, required: true })
  title: string;
}

export const PlantGenusSchema = SchemaFactory.createForClass(PlantGenus);
