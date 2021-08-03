import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Plant } from '../../plants/schemas/plant.schema';

export type SeedingDocument = Seeding & Document;

@Schema()
export class Seeding {
  @Prop({
    type: String,
    required: true,
    default: 'Pending',
    enum: ['Pending', 'Started', 'Stopped', 'Skipped'],
  })
  status: string;

  @Prop({
    type: Number,
    required: true,
  })
  quantity: number;

  @Prop({
    type: Date,
    required: false,
  })
  startedAt: Date;

  @Prop({
    type: Date,
    required: false,
  })
  endedAt: Date;
}

export const SeedingSchema = SchemaFactory.createForClass(Seeding);

export type CropDocument = Crop & Document;

@Schema()
export class Crop {
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'Plant',
    required: true,
  })
  plant: Plant;

  @Prop({ type: Date, required: true })
  createdAt: Date;

  @Prop({ type: Date, required: true })
  updatedAt: Date;

  @Prop({ type: Seeding, required: true })
  seeding: Seeding;

  @Prop({ type: Seeding, required: true })
  transplanting: Seeding;

  @Prop({ type: Seeding, required: true })
  planting: Seeding;

  @Prop({ type: Seeding, required: true })
  harvesting: Seeding;
}

export const CropSchema = SchemaFactory.createForClass(Crop);
