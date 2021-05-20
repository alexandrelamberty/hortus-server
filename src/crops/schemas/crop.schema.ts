import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CropDocument = Crop & Document;

@Schema()
export class Crop {
  @Prop()
  name: string;

  @Prop()
  age: number;

  @Prop()
  breed: string;
}

export const CropSchema = SchemaFactory.createForClass(Crop);