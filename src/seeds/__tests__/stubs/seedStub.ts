import { ObjectId } from "mongodb";
import { Seed } from "../../schemas/seed.schema";

export const seedStub = (): Seed => {
  return {
    _id: ObjectId.createFromHexString("638e04dab2bcf419a0c362c1"),
    name: "Carrot",
    genus: "Daucus",
    species: "Daucus carota",
    // FIXME:
    image: "",
    createdAt: new Date("2022-10-15"),
    updatedAt: new Date("2022-10-15"),
  };
};
