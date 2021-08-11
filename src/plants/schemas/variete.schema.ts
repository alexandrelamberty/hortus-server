import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Harvesting } from './harvesting.schema';
import { Planting } from './planting.schema';
import { Seeding } from './seeding.schema';
import { Transplanting } from './transplanting.schema';

export type VarieteDocument = Variete & Document;

@Schema()
export class Variete {
  @Prop({ type: String, required: true })
  plant: string;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  description: string;

  @Prop({ required: false })
  image: string;

  @Prop({
    type: Array,
    required: true,
  })
  harvest: number[];

  @Prop({
    type: String,
    required: true,
    default: 'Annual',
    enum: ['Annual', 'Biennial', 'Perrenial'],
  })
  season: string;

  @Prop({
    type: String,
    required: true,
    default: 'Pending',
    enum: ['Full sun', 'Started', 'Stopped', 'Skipped'],
  })
  sun: string;

  @Prop({
    type: String,
    required: true,
    default: 'Tolerant',
    enum: ['Tolerant', 'Non tolerant'],
  })
  frost: string;

  @Prop({
    type: String,
    required: true,
    default: 'Pendi1/Weekng',
    enum: ['1/Week', '2/Week', 'Every day'],
  })
  water: string;

  @Prop({
    type: [MongooseSchema.Types.ObjectId],
    ref: Variete.name,
    default: [],
  })
  companions: MongooseSchema.Types.ObjectId[];

  @Prop({
    type: [MongooseSchema.Types.ObjectId],
    ref: Variete.name,
    default: [],
  })
  competitors: MongooseSchema.Types.ObjectId[];

  @Prop({ type: Seeding })
  seeding: Seeding;

  @Prop({ type: Transplanting })
  transplanting: Transplanting;

  @Prop({ type: Planting })
  planting: Planting;

  @Prop({ type: Harvesting })
  harvesting: Harvesting;

  @Prop({ required: false })
  spacing: number;

  @Prop({ required: false })
  rows: number;

  @Prop({ type: Date, default: Date.now })
  createdAt: number;

  @Prop({ type: Date, default: Date.now })
  updatedAt: number;
}

export const VarieteSchema = SchemaFactory.createForClass(Variete);
