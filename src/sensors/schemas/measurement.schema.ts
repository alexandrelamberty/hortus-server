import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MeasurementDocument = Measurement & Document;

@Schema()
export class Measurement {

  @Prop({ type: String, required: true, unique: true, lowercase: true })
  value: string;

  @Prop({ type: String, required: true, unique: true, lowercase: true })
  timestamp: string;
}

export const MeasurementSchema = SchemaFactory.createForClass(Measurement);
