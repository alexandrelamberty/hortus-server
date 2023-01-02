import { CultureDocument } from "@culture/schemas/culture.schema";
import { Logger } from "@nestjs/common";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ObjectId } from "mongodb";
import { Document, Model, Schema as MongooseSchema } from "mongoose";
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

@Schema({ timestamps: true })
export class Seed {
  _id: ObjectId;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: "Plant",
    required: true,
  })
  plant: ObjectId | Plant;

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
  })
  harvest: number[];

  @Prop({
    type: String,
    enum: Season,
  })
  season: string;

  @Prop({
    type: String,
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
    required: false,
    //default: [],
  })
  companions: MongooseSchema.Types.ObjectId[];

  @Prop({
    type: [MongooseSchema.Types.ObjectId],
    ref: Plant.name,
    required: false,
    //default: [],
  })
  competitors: MongooseSchema.Types.ObjectId[];

  @Prop({ type: Seeding, required: true })
  seeding: Seeding;

  @Prop({ type: Transplanting, required: true })
  transplanting: Transplanting;

  @Prop({ type: Planting, required: true })
  planting: Planting;

  @Prop({ type: Harvesting, required: true })
  harvesting: Harvesting;

  @Prop({ required: false })
  spacing: number;

  @Prop({ required: false })
  rows: number;

  @Prop({ type: Date })
  createdAt: Date;

  @Prop({ type: Date })
  updatedAt: Date;
}

export const SeedSchema = SchemaFactory.createForClass(Seed);

export const SeedSchemaFactory = (
  cultureModel: Model<CultureDocument>
): MongooseSchema<any> => {
  // remove all culture derived from this seed
  SeedSchema.pre<Plant>(
    "remove",
    { document: true, query: true },
    async function () {
      Logger.log(this._id);
      await cultureModel.deleteMany({ seed_id: this._id });
    }
  );

  return SeedSchema;
};
