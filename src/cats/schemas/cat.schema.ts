import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Food, FoodSchema } from './food.schema';
import { Owner } from './owner.schema';

export type CatDocument = Cat & Document;

@Schema()
export class Cat {
  @Prop()
  name: string;

  @Prop()
  age: number;

  @Prop()
  breed: string;

  @Prop({ type: [FoodSchema] })
  favFoods: Food[];

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: Owner.name })
  owner: Owner;
}

export const CatSchema = SchemaFactory.createForClass(Cat);
