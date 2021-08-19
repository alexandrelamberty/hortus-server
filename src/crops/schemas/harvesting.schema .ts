import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { PhaseStatus } from '../enum/PhaseStatus';

export type HarvestingDocument = Harvesting & Document;

@Schema()
export class Harvesting {
  @Prop({
    type: String,
    required: true,
    default: PhaseStatus.Pending,
    enum: PhaseStatus,
  })
  status: string;

  @Prop({
    type: Number,
    required: true,
  })
  quantity: number;

  @Prop({
    type: Date,
    default: Date.now(),
  })
  startedAt: Date;

  @Prop({
    type: Date,
    required: false,
  })
  endedAt: Date;
}

export const HarvestingSchema = SchemaFactory.createForClass(Harvesting);
