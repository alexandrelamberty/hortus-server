import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { CutlureLocation } from '../enum/location.enum';
import { PhaseStatus } from '../enum/phase-status.enum';

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
    default: CutlureLocation.Indoor,
    enum: CutlureLocation,
  })
  location: string = CutlureLocation.Indoor;

  @Prop({
    type: Number,
    required: true,
  })
  quantity: number = 0;

  @Prop({
    type: String,
    default: "neutral",
  })
  soil: string = "neutral"

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
