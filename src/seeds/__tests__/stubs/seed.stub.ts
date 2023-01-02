import { ObjectId } from "mongodb";
import { Frost } from "../../enums/frost.enum";
import { Season } from "../../enums/season.enum";
import { Sun } from "../../enums/sun.enum";
import { Type } from "../../enums/type.enum";
import { Water } from "../../enums/water.enum";
import { Seed } from "../../schemas/seed.schema";

export const seedStub = (): Seed => {
  return {
    _id: ObjectId.createFromHexString("638e04dab2bcf419a0c362c1"),
    plant: ObjectId.createFromHexString("638e04dab2bcf419a0c362c1"),
    name: "Carrot",
    description: "",
    type: Type.Bulb,
    image: "",
    harvest: [20, 60],
    season: Season.Annual,
    frost: Frost.NonTolerant,
    water: Water.Everyday,
    sun: Sun.FullShade,
    companions: [],
    competitors: [],
    seeding: {
      start: 4,
      end: 6,
      germination: 20,
    },
    transplanting: {
      start: 4,
      end: 6,
      growth: 20,
    },
    planting: {
      start: 4,
      end: 6,
      maturity: 20,
    },
    harvesting: {
      start: 4,
      end: 6,
      duration: 20,
    },
    spacing: 10,
    rows: 20,
    createdAt: new Date("2022-10-15"),
    updatedAt: new Date("2022-10-15"),
  };
};
