import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { CutlureLocation } from '../enum/CultureLocation';
import { PhaseStatus } from '../enum/PhaseStatus';

export type TransplantingDocument = Transplanting & Document;

@Schema()
export class Transplanting {
  @Prop({
    type: String,
    required: true,
    default: PhaseStatus.Pending,
    enum: PhaseStatus,
  })
  status: string;

  @Prop({
    type: String,
    required: true,
    default: CutlureLocation.Indoor,
    enum: CutlureLocation,
  })
  location: string;

  @Prop({
    type: Number,
    required: true,
  })
  quantity: number;

  @Prop({
    type: Date,
    required: false,
  })
  startedAt: Date;

  @Prop({
    type: Date,
    required: false,
  })
  endedAt: Date;
}

export const TransplantingSchema = SchemaFactory.createForClass(Transplanting);
