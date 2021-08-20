import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Frost } from '../enum/frost.enum';
import { Season } from '../enum/season.enum';
import { Sun } from '../enum/sun.enum';
import { Water } from '../enum/water.enum';
import { Harvesting } from './harvesting.schema';
import { Planting } from './planting.schema';
import { Seeding } from './seeding.schema';
import { Transplanting } from './transplanting.schema';
import { Type } from './type.schema';

export type CropDocument = Crop & Document;

@Schema()
export class Crop {

  @Prop({ type: String, required: true })
  plant: string;

  @Prop({ type: String, required: true, unique: true })
  name: string;

  @Prop({ type: String, required: true })
  description: string;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: Type.name,
    required: true,
  })
  type: MongooseSchema.Types.ObjectId;

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
    default: Season.Annual,
    enum: Season,
  })
  season: string;

  @Prop({
    type: String,
    required: true,
    default: Sun.FullSun,
    enum: Sun,
  })
  sun: string;

  @Prop({
    type: String,
    required: true,
    default: Frost.None,
    enum: Frost,
  })
  frost: string;

  @Prop({
    type: String,
    required: true,
    default: Water.OnceWeek,
    enum: Water,
  })
  water: string;

  @Prop({
    type: [MongooseSchema.Types.ObjectId],
    ref: Crop.name,
    default: [],
  })
  companions: MongooseSchema.Types.ObjectId[];

  @Prop({
    type: [MongooseSchema.Types.ObjectId],
    ref: Crop.name,
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
  createdAt: Date;

  @Prop({ type: Date, default: Date.now })
  updatedAt: Date;
}

export const CropSchema = SchemaFactory.createForClass(Crop);

CropSchema.pre<Crop>('save', function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const crop = this;
  const now = new Date();
  crop.updatedAt = now;
  if (!crop.createdAt) {
    crop.createdAt = now;
  }
  next();
});
