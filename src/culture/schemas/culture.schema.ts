import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
<<<<<<< HEAD:src/culture/schemas/culture.schema.ts
import { Crop } from '../../crop/schemas/crop.schema';
=======
import { Seed } from 'src/seeds/schemas/seed.schema';
>>>>>>> 1fff0e678f3104a8b805d910decada9547f86151:src/crops/schemas/crop.schema.ts
import { Harvesting } from './harvesting.schema ';
import { Planting } from './planting.schema';
import { Seeding } from './seeding.schema';
import { Transplanting } from './transplanting.schema';

export type CultureDocument = Culture & Document;

@Schema()
export class Culture {

  @Prop({
    type: MongooseSchema.Types.ObjectId,
<<<<<<< HEAD:src/culture/schemas/culture.schema.ts
    ref: 'Crop',
    required: true,
  })
  crop: Crop;
=======
    ref: 'Seed',
    required: true,
  })
  seed: Seed;
>>>>>>> 1fff0e678f3104a8b805d910decada9547f86151:src/crops/schemas/crop.schema.ts

  @Prop({
    type: Seeding,
    ref: 'Seeding',
    required: true,
  })
  seeding: Seeding;

  @Prop({
    type: Transplanting,
    ref: 'Transplanting',
    required: true,
  })
  transplanting: Transplanting;

  @Prop({
    type: Planting,
    ref: 'Planting',
    required: true,
  })
  planting: Planting;

  @Prop({
    type: Harvesting,
    ref: 'Harvesting',
    required: true,
  })
  harvesting: Harvesting;

  @Prop({ type: Date, default: Date.now() })
  createdAt: Date;

  @Prop({ type: Date, required: true })
  updatedAt: Date;
<<<<<<< HEAD:src/culture/schemas/culture.schema.ts
  
}

export const CultureSchema = SchemaFactory.createForClass(Culture);
=======
}

export const CropSchema = SchemaFactory.createForClass(Crop);

CropSchema.pre<Crop>('save', function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const crop = this;
  const now = new Date();
  crop.updatedAt = now;
  if (!crop.createdAt) {
    crop.createdAt = now;
  }
  next();
});
>>>>>>> 1fff0e678f3104a8b805d910decada9547f86151:src/crops/schemas/crop.schema.ts
