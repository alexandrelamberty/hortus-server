import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { CutlureLocation } from '../enum/location.enum';
import { PhaseStatus } from '../enum/phase-status.enum';

export type SeedingDocument = Seeding & Document;

@Schema()
export class Seeding {
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

  soil: string;

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

export const SeedingSchema = SchemaFactory.createForClass(Seeding);
