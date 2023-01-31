import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose";
import { Document, Model, model } from "mongoose";

export type PlantDocument = Plant & Document;

@Schema({ timestamps: true })
export class Plant {
  _id: mongoose.Types.ObjectId;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  family: string;

  @Prop({ type: String, required: true })
  genus: string;

  @Prop({ type: String, required: true })
  species: string;

  @Prop({ type: String, required: false })
  image: string;

  @Prop({ type: String, required: false })
  subspecies?: string;

  @Prop({ type: String, required: false })
  variety?: string;

  @Prop({ type: String, required: false })
  forma?: string;

  @Prop({ type: String, required: false })
  cultivar?: string;

  @Prop({ type: String, required: false })
  hybrid?: string;

  @Prop({ type: String, required: false })
  binomial?: string;

  @Prop({ type: String, required: false })
  trinomial?: string;

  @Prop({ type: Array<string>, required: false })
  common_names?: Array<string>;

  @Prop({ type: String, required: false })
  color?: string;

  @Prop({ type: Date })
  createdAt: Date;

  @Prop({ type: Date })
  updatedAt: Date;
}

export const PlantSchema = SchemaFactory.createForClass(Plant);

export const PlantModel: Model<PlantDocument> = model<PlantDocument>(
  "Plant",
  PlantSchema
);

export const PlantSchemaFactory = (
): mongoose.Schema<any> => {
  // remove all seed derived from this plant
  // PlantSchema.pre("deleteOne", function (next) {
  //   // const filter = this.getFilter();
  //   // seedModel.deleteMany({ plant: filter._id }, next).exec();
  // });

  return PlantSchema;
};
