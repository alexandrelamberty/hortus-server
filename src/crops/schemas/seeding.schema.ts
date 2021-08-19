import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SeedingDocument = Seeding & Document;

@Schema()
export class Seeding {
  @Prop({
    type: String,
    required: true,
    default: 'Pending',
    enum: ['Pending', 'Started', 'Stopped', 'Skipped'],
  })
  status: string;

  @Prop({
    type: String,
    required: true,
    default: 'Pending',
    enum: ['Indoor', 'Frame', 'Outdoor'],
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
