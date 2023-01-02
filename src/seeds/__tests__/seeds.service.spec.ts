import { Test, TestingModule } from "@nestjs/testing";
import { ObjectId } from "mongodb";
import { CreateSeedDto } from "../dto/create-seed.dto";
import { SeedQueryParams } from "../dto/seed-query.dto";
import { UpdateSeedDto } from "../dto/update-seed.dto";
import { SeedsService } from "../seeds.service";
import { seedStub } from "./stubs/seed.stub";
import { Frost } from "../enums/frost.enum";
import { Season } from "../enums/season.enum";
import { Sun } from "../enums/sun.enum";
import { Water } from "../enums/water.enum";
import { Type } from "../enums/type.enum";

jest.mock("../seeds.service");

describe("SeedsService", () => {
  let service: SeedsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SeedsService],
    }).compile();

    service = module.get<SeedsService>(SeedsService);
  });

  describe("getAllSeeds", () => {
    describe("when getAllTasks is called", () => {
      it("should return an array of Seeds", async () => {
        const query: SeedQueryParams = {
          page: 1,
          limit: 10,
        };
        const result = await service.getAllSeeds(query);
        expect(result).toEqual([seedStub()]);
      });
    });
  });

  describe("getSeedById", () => {
    const objectID = ObjectId.createFromHexString("638e04dab2bcf419a0c362c1");
    it("should return a Seed", async () => {
      const result = await service.getSeedById(objectID);
      expect(result).toEqual(seedStub());
    });

    it("should throw an error if Seed is not found", async () => {
      try {
        const invalidObjectID = ObjectId.createFromHexString(
          "638e04dab2bcf419a0c362c"
        );
        await service.getSeedById(invalidObjectID);
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
      }
    });
  });

  describe("createSeed", () => {
    it("should create a Seed", async () => {
      const dto: CreateSeedDto = {
        plant: ObjectId.createFromHexString("638e04dab2bcf419a0c362c1"),
        name: "Carrot",
        description: "sdfsdf",
        harvest: [20, 60],
        type: Type.Bulb,
        season: Season.Annual,
        frost: Frost.NonTolerant,
        water: Water.Everyday,
        sun: Sun.FullShade,
        seeding: {
          start: 8,
          end: 9,
          germination: 10,
        },
        transplanting: {
          start: 8,
          end: 9,
          growth: 10,
        },
        planting: {
          start: 8,
          end: 9,
          maturity: 10,
        },
        harvesting: {
          start: 8,
          end: 9,
          duration: 10,
        },
        spacing: 20,
        rows: 10,
        image: "",
      };
      const result = await service.createSeed(dto);
      expect(result).toEqual(seedStub());
    });
  });

  describe("updateSeed", () => {
    it("should update a Seed", async () => {
      const objectID = ObjectId.createFromHexString("638e04dab2bcf419a0c362c1");
      const dto: UpdateSeedDto = {
        name: "Updated Seed title",
      };
      const result = await service.updateSeed(objectID, dto);
      expect(result).toEqual(seedStub());
    });

    it("should throw an error if Seed is not found", async () => {
      try {
        const invalidObjectID = ObjectId.createFromHexString(
          "638e04dab2bcf419a0c362c"
        );
        const dto: UpdateSeedDto = {
          name: "Updated Seed title",
        };
        await service.updateSeed(invalidObjectID, dto);
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
      }
    });
  });

  describe("deleteSeed", () => {
    describe("when deleteSeed is called", () => {
      it("should delete a Seed", async () => {
        const objectID = ObjectId.createFromHexString(
          "638e04dab2bcf419a0c362c1"
        );
        const result = await service.deleteSeed(objectID);
        expect(result).toEqual(seedStub());
      });

      it("should throw an error if Seed is not found", async () => {
        try {
          const invalidObjectID = ObjectId.createFromHexString(
            "638e04dab2bcf419a0c362c"
          );
          await service.deleteSeed(invalidObjectID);
        } catch (error) {
          expect(error).toBeInstanceOf(Error);
        }
      });
    });
  });
});
