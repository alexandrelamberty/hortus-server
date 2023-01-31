import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { PhaseStatus } from "../enum/phase-status.enum";
import { Harvest, HarvestSchema } from "./harvest";

@Schema({ _id: false })
export class HarvestingPhase {
  @Prop({
    type: String,
    required: true,
    enum: PhaseStatus,
    default: PhaseStatus.Pending,
  })
  status: string = PhaseStatus.Pending;

  @Prop({
    type: [HarvestSchema],
    ref: "Harvest",
  })
  harvests: Harvest[];

  @Prop({
    type: Number,
    required: false,
  })
  quantity: number;

  @Prop({
    type: Number,
    required: false,
  })
  weight: number;

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

export const HarvestingSchema = SchemaFactory.createForClass(HarvestingPhase);
