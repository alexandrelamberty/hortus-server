import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PlantingDocument = Planting & Document;

@Schema()
export class Planting {
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
