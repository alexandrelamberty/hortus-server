import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Plant } from '../../plants/schemas/plant.schema';
import { Harvesting } from './harvesting.schema ';
import { Planting } from './planting.schema';
import { Seeding } from './seeding.schema';
import { Transplanting } from './transplanting.schema';

export type CropDocument = Crop & Document;

@Schema()
export class Crop {
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'Plant',
    required: true,
  })
  plant: Plant;

  @Prop({ type: Date, default: Date.now() })
  createdAt: Date;

  @Prop({ type: Date, required: true })
  updatedAt: Date;

  @Prop({
    type: Seeding,
    ref: 'Seeding',
    required: true,
  })
  seeding: Seeding;

  @Prop({
    type: Transplanting,
    ref: 'Transplanting',
    required: true,
  })
  transplanting: Transplanting;

  @Prop({
    type: Planting,
    ref: 'Planting',
    required: true,
  })
  planting: Planting;

  @Prop({
    type: Harvesting,
    ref: 'Harvesting',
    required: true,
  })
  harvesting: Harvesting;
}

export const CropSchema = SchemaFactory.createForClass(Crop);
