import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Seed } from "@seeds/schemas/seed.schema";
import * as mongoose from "mongoose";
import { Document, Schema as MongooseSchema } from "mongoose";
import { Harvesting } from "./harvesting.schema";
import { Planting } from "./planting.schema";
import { Seeding } from "./seeding.schema";
import { Transplanting } from "./transplanting.schema";
export type CultureDocument = Culture & Document;

@Schema({ timestamps: true })
export class Culture {
  _id: string;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: "Seed",
    required: true,
  })
  seed: Seed;

  @Prop({
    type: Seeding,
    ref: "Seeding",
    required: true,
  })
  seeding: Seeding;

  @Prop({
    type: Transplanting,
    ref: "Transplanting",
    required: false,
  })
  transplanting: Transplanting;

  @Prop({
    type: Planting,
    ref: "Planting",
    required: true,
  })
  planting: Planting;

  @Prop({
    type: Harvesting,
    ref: "Harvesting",
    required: true,
  })
  harvesting: Harvesting;

  @Prop({ type: Date })
  createdAt: Date;

  @Prop({ type: Date })
  updatedAt: Date;
}

export const CultureSchema = SchemaFactory.createForClass(Culture);

export const CultureSchemaFactory = (): mongoose.Schema<any> => {
  return CultureSchema;
};
