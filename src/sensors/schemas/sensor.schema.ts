import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Schema as MongooseSchema } from 'mongoose'
import { Measurement } from './measurement.schema'

export type SensorDocument = Sensor & Document

@Schema()
export class Sensor {
  @Prop({ type: String, required: true, unique: true })
  name: string

  @Prop({ type: String, required: true, unique: true, lowercase: true })
  ip: string

  @Prop({ type: String, required: true, unique: true, lowercase: true })
  macaddress: string

  @Prop({
    type: MongooseSchema.Types.Array,
    default: [],
  })
  measurements: Measurement[]
}

export const SensorSchema = SchemaFactory.createForClass(Sensor)
