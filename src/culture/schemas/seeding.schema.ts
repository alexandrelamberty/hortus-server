import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { CutlureLocation } from "../enum/culture-location.enum";
import { PhaseStatus } from "../enum/phase-status.enum";
import { SoilType } from "../enum/soil-type.enum";

@Schema({ _id: false })
export class SeedingPhase {
  @Prop({
    type: String,
    required: true,
    enum: PhaseStatus,
    default: PhaseStatus.Pending,
  })
  status: string = PhaseStatus.Pending;

  @Prop({
    type: String,
    enum: CutlureLocation,
  })
  location?: string;

  @Prop({
    type: String,
    enum: SoilType,
  })
  soil?: string;

  @Prop({
    type: Number,
  })
  quantity?: number;

  @Prop({
    type: Date,
  })
  startedAt?: Date;

  @Prop({
    type: Date,
  })
  skippedAt?: Date;

  @Prop({
    type: Date,
  })
  endedAt?: Date;
}

export const SeedingSchema = SchemaFactory.createForClass(SeedingPhase);
