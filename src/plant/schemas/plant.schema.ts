import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PlantDocument = Plant & Document;

@Schema()
export class Plant {
  @Prop({ type: String, required: false })
  picture: string

  @Prop({ type: String, required: false })
  color: string

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: false })
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

export const PlantSchema = SchemaFactory.createForClass(Plant);
