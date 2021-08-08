import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PlantTypeDocument = PlantType & Document;

@Schema({ collection: 'plant-types' })
export class PlantType {
  @Prop({ type: String, required: true })
  title: string;
}

export const PlantTypeSchema = SchemaFactory.createForClass(PlantType);
