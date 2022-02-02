import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SpeciesDocument = Species & Document;

@Schema({ collection: 'species' })
export class Species {

  @Prop({ type: String, required: true })
  name: string;

	@Prop({ type: String, required: true })
  name_fr: string;
  
	@Prop({ type: String, required: true })
  family: string;

  @Prop({ type: String, required: true })
  genus: string;

  @Prop({ type: String, required: true })
  species: string;

  @Prop({ type: String, required: false })
  subspecies: string;

  @Prop({ type: String, required: false })
  variant: string;

}

export const SpeciesSchema = SchemaFactory.createForClass(Species);
