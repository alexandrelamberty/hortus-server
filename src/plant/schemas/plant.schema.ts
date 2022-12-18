import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type PlantDocument = Plant & Document;

@Schema()
export class Plant {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  binomial: string;

  @Prop({ type: String, required: true })
  family: string;

  @Prop({ type: String, required: true })
  genus: string;

  @Prop({ type: String, required: true })
  species: string;

  @Prop({ type: String, required: true })
  image: string;

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

  @Prop({ type: Array<string>, required: false })
  common_names: Array<string>;

  // FIXME: generate server side from picture colors or ui?
  @Prop({ type: String, required: false })
  color: string;
}

export const PlantSchema = SchemaFactory.createForClass(Plant);
