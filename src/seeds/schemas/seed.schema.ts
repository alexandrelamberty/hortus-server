import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as MongooseSchema } from "mongoose";
import { Plant } from "../../plant/schemas/plant.schema";
import { Frost } from "../enums/frost.enum";
import { Season } from "../enums/season.enum";
import { Sun } from "../enums/sun.enum";
import { Type } from "../enums/type.enum";
import { Water } from "../enums/water.enum";
import { Harvesting } from "./harvesting.schema";
import { Planting } from "./planting.schema";
import { Seeding } from "./seeding.schema";
import { Transplanting } from "./transplanting.schema";

export type SeedDocument = Seed & Document;

@Schema()
export class Seed {
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: "Plant",
    required: true,
  })
  plant: Plant;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  description: string;

  @Prop({ type: String, required: false })
  image: string;

  @Prop({
    type: String,
    required: true,
    enum: Type,
  })
  type: string;

  @Prop({
    type: Array,
    required: false,
  })
  harvest: number[];

  @Prop({
    type: String,
    required: true,
    enum: Season,
  })
  season: string;

  @Prop({
    type: String,
    required: true,
    enum: Sun,
  })
  sun: string;

  @Prop({
    type: String,
    required: true,
    enum: Frost,
  })
  frost: string;

  @Prop({
    type: String,
    required: true,
    enum: Water,
  })
  water: string;

  @Prop({
    type: [MongooseSchema.Types.ObjectId],
    ref: Plant.name,
    //default: [],
  })
  companions: MongooseSchema.Types.ObjectId[];

  @Prop({
    type: [MongooseSchema.Types.ObjectId],
    ref: Plant.name,
    //default: [],
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

export const SeedSchema = SchemaFactory.createForClass(Seed);

SeedSchema.pre<Seed>("save", function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const seed = this;
  const now = new Date();
  seed.updatedAt = now;
  if (!seed.createdAt) {
    seed.createdAt = now;
  }
  next();
});
