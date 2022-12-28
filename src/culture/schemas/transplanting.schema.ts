import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

import { CutlureLocation } from "../enum/location.enum";
import { PhaseStatus } from "../enum/phase-status.enum";
import { Soil } from "../enum/soil.enum";

export type TransplantingDocument = Transplanting & Document;

@Schema()
export class Transplanting {
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
    default: CutlureLocation.Inside,
    enum: CutlureLocation,
  })
  location: string = CutlureLocation.Inside;

  @Prop({
    type: String,
    default: Soil.Chalk,
    enum: Soil,
  })
  soil = Soil.Chalk; // FIXME: @see culture.controller.ts

  @Prop({
    type: Number,
    required: true,
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

export const TransplantingSchema = SchemaFactory.createForClass(Transplanting);
