import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

import { CutlureLocation } from "../enum/location.enum";
import { PhaseStatus } from "../enum/phase-status.enum";
import { Soil } from "../enum/soil.enum";

export type SeedingDocument = Seeding & Document;

@Schema()
export class Seeding {
  @Prop({
    type: String,
    default: PhaseStatus.Pending,
    enum: PhaseStatus,
  })
  status: string = PhaseStatus.Pending;

  @Prop({
    type: String,
    default: CutlureLocation.Inside,
    enum: CutlureLocation,
  })
  location: string = CutlureLocation.Inside; // FIXME: @see culture.controller.ts

  @Prop({
    type: String,
    default: Soil.Chalk,
    enum: Soil,
  })
  soil = Soil.Chalk; // FIXME: @see culture.controller.ts

  @Prop({
    type: Number,
    default: 0,
  })
  quantity = 0;

  @Prop({
    type: Date,
    required: false,
  })
  startedAt: Date;

  @Prop({
    type: Date,
    required: false,
  })
  skippedAt: Date;

  @Prop({
    type: Date,
    required: false,
  })
  endedAt: Date;
}

export const SeedingSchema = SchemaFactory.createForClass(Seeding);
