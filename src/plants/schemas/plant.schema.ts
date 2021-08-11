import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Family } from './family.schema';
import { Genus } from './genus.schema';
import { Type } from './type.schema';
import { Variete } from './variete.schema';

export type PlantDocument = Plant & Document;

@Schema()
export class Plant {
  @Prop({ type: String, required: true, unique: true })
  name: string;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: Family.name,
    required: true,
  })
  family: MongooseSchema.Types.ObjectId;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: Genus.name,
    required: true,
  })
  genus: MongooseSchema.Types.ObjectId;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: Type.name,
    required: true,
  })
  type: MongooseSchema.Types.ObjectId;

  @Prop({ type: String, required: true })
  description: string;

  @Prop({ type: String })
  image: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: Variete.name })
  varietes: MongooseSchema.Types.ObjectId[];

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: Date, default: Date.now })
  updatedAt: Date;
}

export const PlantSchema = SchemaFactory.createForClass(Plant);

PlantSchema.pre<Plant>('save', function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const plant = this;
  const now = new Date();
  plant.updatedAt = now;
  if (!plant.createdAt) {
    plant.createdAt = now;
  }
  next();
});
