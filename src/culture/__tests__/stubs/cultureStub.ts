import { ObjectId } from "mongodb";
import { Culture } from "../../schemas/culture.schema";

export const cultureStub = (): Culture => {
  return {
    _id: ObjectId.createFromHexString("638e04dab2bcf419a0c362c1"),
    seed: ObjectId.createFromHexString("638e04dab2bcf419a0c362c1"),
    createdAt: new Date("2022-10-15"),
    updatedAt: new Date("2022-10-15"),
  };
};
