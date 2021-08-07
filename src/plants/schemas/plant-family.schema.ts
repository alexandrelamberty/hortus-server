import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PlantFamilyDocument = PlantFamily & Document;

@Schema({ collection: 'plant-families' })
export class PlantFamily {
  @Prop({ type: String, required: true })
  title: string;
}

export const PlantFamilySchema = SchemaFactory.createForClass(PlantFamily);
