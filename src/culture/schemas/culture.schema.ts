import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Crop } from '../../crop/schemas/crop.schema';
import { Harvesting } from './harvesting.schema ';
import { Planting } from './planting.schema';
import { Seeding } from './seeding.schema';
import { Transplanting } from './transplanting.schema';

export type CultureDocument = Culture & Document;

@Schema()
export class Culture {

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'Crop',
    required: true,
  })
  crop: Crop;

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

  @Prop({ type: Date, default: Date.now() })
  createdAt: Date;

  @Prop({ type: Date, required: true })
  updatedAt: Date;
  
}

export const CultureSchema = SchemaFactory.createForClass(Culture);
