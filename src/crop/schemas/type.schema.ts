import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TypeDocument = Type & Document;

@Schema({ collection: 'types' })
export class Type {
  @Prop({ type: String, required: true })
  name: string;
}

export const TypeSchema = SchemaFactory.createForClass(Type);
