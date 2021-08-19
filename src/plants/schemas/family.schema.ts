import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type FamilyDocument = Family & Document;

@Schema({ collection: 'plant-families' })
export class Family {
  @Prop({ type: String, required: true })
  title: string;
}

export const FamilySchema = SchemaFactory.createForClass(Family);
