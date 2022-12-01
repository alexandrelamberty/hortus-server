import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { CutlureLocation } from "../enum/location.enum";
import { PhaseStatus } from "../enum/phase-status.enum";

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
    default: CutlureLocation.Indoor,
    enum: CutlureLocation,
  })
  location: string = CutlureLocation.Indoor;

  @Prop({
    type: Number,
    default: 0,
  })
  quantity = 0;

  @Prop({
    type: String,
    default: "neutral",
  })
  soil = "neutral";

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
