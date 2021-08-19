import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types, Schema as MongooseSchema } from 'mongoose';
import { Plant } from '../../plants/schemas/plant.schema';

export type TypeDocument = Type & Document;

@Schema()
export class Type {
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'Plant',
    required: true,
  })
  plant: Plant;
}

export const CropSchema = SchemaFactory.createForClass(Crop);
