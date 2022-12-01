import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { PhaseStatus } from "../enum/phase-status.enum";

export type HarvestingDocument = Harvesting & Document;

@Schema()
export class Harvesting {
  @Prop({
    type: String,
    required: true,
    default: PhaseStatus.Pending,
    enum: PhaseStatus,
  })
  status: string = PhaseStatus.Pending;

  @Prop({
    type: Number,
    required: true,
  })
  quantity = 0;

  // FIXME: weight metric in kg
  // weight : number

  @Prop({
    type: Number,
    required: false,
  })
  weight = 0;

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

export const HarvestingSchema = SchemaFactory.createForClass(Harvesting);
