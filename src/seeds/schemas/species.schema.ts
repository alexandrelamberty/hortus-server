import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SpeciesDocument = Species & Document;

@Schema({ collection: 'species' })
export class Species {
  @Prop({ type: String, required: true })
  name: string;
}

export const SpeciesSchema = SchemaFactory.createForClass(Species);
