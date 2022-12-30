import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose";
import { Document, Schema as MongooseSchema } from "mongoose";
import { Seed } from "../../seeds/schemas/seed.schema";
import { HarvestingPhase, HarvestingSchema } from "./harvesting";
import { PlantingPhase, PlantingSchema } from "./planting";
import { SeedingPhase as SowingPhase, SeedingSchema } from "./seeding";
import { TransplantingPhase, TransplantingSchema } from "./transplanting";

export type CultureDocument = Culture & Document;
/**
 * A class representing a culture in a cultivation process.
 *
 * The `Culture` class is a Mongoose schema that represents a culture in a
 * cultivation process. It includes fields for a seed, as well as details about
 * the seeding, transplanting, planting, and harvesting phases of the
 * cultivation process.
 */
@Schema({ timestamps: true })
export class Culture {
  _id: string;

  /**
   * The seed used in the culture.
   *
   * This should be a reference to a `Seed` document in the seeds collection.
   */
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: "Seed",
    required: true,
  })
  seed: Seed;

  @Prop({
    type: SeedingSchema,
    ref: "SeedingPhase",
    default: () => ({}),
  })
  seeding: SowingPhase;

  @Prop({
    type: TransplantingSchema,
    ref: "TransplantingPhase",
    default: () => ({}),
  })
  transplanting: TransplantingPhase;

  @Prop({
    type: PlantingSchema,
    ref: "PlantingPhase",
    default: () => ({}),
  })
  planting: PlantingPhase;

  @Prop({
    type: HarvestingSchema,
    ref: "HarvestingPhase",
    default: () => ({}),
  })
  harvesting: HarvestingPhase;

  @Prop({ type: Date, required: false })
  createdAt: Date;

  @Prop({ type: Date, required: false })
  updatedAt: Date;
}

export const CultureSchema = SchemaFactory.createForClass(Culture);

export const CultureSchemaFactory = (): mongoose.Schema<any> => {
  return CultureSchema;
};
