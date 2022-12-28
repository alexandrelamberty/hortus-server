import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

import { CutlureLocation } from "../enum/location.enum";
import { PhaseStatus } from "../enum/phase-status.enum";
import { Soil } from "../enum/soil.enum";

export type PlantingDocument = Planting & Document;

@Schema()
export class Planting {
  @Prop({
    type: String,
    required: true,
    default: PhaseStatus.Pending,
    enum: PhaseStatus,
  })
  status: string = PhaseStatus.Pending;

  @Prop({
    type: String,
    required: true,
    default: CutlureLocation.Outside,
    enum: CutlureLocation,
  })
  location: string = CutlureLocation.Outside;

  @Prop({
    type: String,
    default: Soil.Chalk,
    enum: Soil,
  })
  soil = Soil.Chalk; // FIXME: @see culture.controller.ts

  @Prop({
    type: Number,
    required: false,
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

export const PlantingSchema = SchemaFactory.createForClass(Planting);
