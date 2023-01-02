import { ObjectId } from "mongodb";
import { Plant } from "../../schemas/plant.schema";

export const plantStub = (): Plant => {
  return {
    _id: ObjectId.createFromHexString("638e04dab2bcf419a0c362c1"),
    name: "Carrot",
    family: "Apiaceae",
    genus: "Daucus",
    species: "Daucus carota",
    // FIXME:
    image: "",
    createdAt: new Date("2022-10-15"),
    updatedAt: new Date("2022-10-15"),
  };
};
