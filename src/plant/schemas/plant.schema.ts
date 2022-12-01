import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type PlantDocument = Plant & Document;

@Schema()
export class Plant {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  binomial: string;

  @Prop({ type: String, required: false })
  family: string;

  @Prop({ type: String, required: true })
  genus: string;

  @Prop({ type: String, required: true })
  species: string;

  @Prop({ type: String, required: false })
  subspecies: string;

  @Prop({ type: String, required: false })
  variety: string;

  @Prop({ type: String, required: false })
  forma: string;

  @Prop({ type: String, required: false })
  cultivar: string;

  @Prop({ type: String, required: false })
  hybrid: string;

  @Prop({ type: String, required: false })
  picture: string;

  // @Prop({ type: String, required: false })
  // color: string;

  // @Prop()
  // common_names: Array<string>;
}

export const PlantSchema = SchemaFactory.createForClass(Plant);
