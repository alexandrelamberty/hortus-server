import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type GenusDocument = Genus & Document;

@Schema({ collection: 'genera' })
export class Genus {
  @Prop({ type: String, required: true })
  name: string;
}

export const GenusSchema = SchemaFactory.createForClass(Genus);
