import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { CutlureLocation } from '../enum/location.enum';
import { PhaseStatus } from '../enum/phase-status.enum';

export type PlantingDocument = Planting & Document;

@Schema()
export class Planting {
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
    default: CutlureLocation.Outdoor,
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

export const PlantingSchema = SchemaFactory.createForClass(Planting);
