import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { PlantFamily } from 'src/plants/schemas/plant-family.schema';
import { PlantGenus } from 'src/plants/schemas/plant-genus.schema';
import { PlantType } from 'src/plants/schemas/plant-type.schema';

export type PlantDocument = Plant & Document;

@Schema()
export class Plant {
  @Prop({ type: String, required: true, unique: true })
  name: string;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: PlantFamily.name,
    required: true,
  })
  family: MongooseSchema.Types.ObjectId;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: PlantGenus.name,
    required: true,
  })
  genus: MongooseSchema.Types.ObjectId;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: PlantType.name,
    required: true,
  })
  types: MongooseSchema.Types.ObjectId;

  @Prop({ type: String, required: true })
  description: string;

  @Prop({ required: false })
  image: string;

  @Prop({ required: false })
  seeding: number[];

  @Prop({ required: false })
  transplanting: number[];

  @Prop({ required: false })
  planting: number[];

  @Prop({ required: false })
  harvesting: number[];

  @Prop({ required: false })
  spacing: number;

  @Prop({ required: false })
  rows: number;

  @Prop({ type: Date, default: Date.now })
  createdAt: number;

  @Prop({ type: Date, default: Date.now })
  updatedAt: number;
}

export const PlantSchema = SchemaFactory.createForClass(Plant);
