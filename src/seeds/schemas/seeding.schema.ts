import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Seeding {
  @Prop({ required: true })
  start: number;

  @Prop({ required: true })
  end: number;

  @Prop({ required: true })
  germination: number;
}

export const SeedingSchema = SchemaFactory.createForClass(Seeding);
