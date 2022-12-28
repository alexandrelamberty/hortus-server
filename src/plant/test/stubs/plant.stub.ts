import { Plant } from "@plant/schemas/plant.schema";

export const plantStub = (): Plant => {
  return {
    _id: "",
    name: "Carrot",
    binomial: "D. carota",
    family: "Apiaceae",
    genus: "Daucus",
    species: "D. carota",
    image: "xxx.webp",
    createdAt: new Date(),
    updatedAt: new Date(),
  };
};
