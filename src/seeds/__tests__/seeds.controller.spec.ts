import { INestApplication, ValidationPipe } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { ObjectId } from "mongodb";
import { SeedsController } from "../controllers/seeds.controller";
import { CreateSeedDto } from "../dto/create-seed.dto";
import { SeedQueryParams } from "../dto/seed-query.dto";
import { Seed } from "../schemas/seed.schema";
import { SeedsService } from "../seeds.service";
import { seedStub } from "./stubs/seed.stub";
import { Type } from "../enums/type.enum";
import { Season } from "../enums/season.enum";
import { Frost } from "../enums/frost.enum";
import { Water } from "../enums/water.enum";
import { Sun } from "../enums/sun.enum";
import { UpdateSeedDto } from "../dto/update-seed.dto";

jest.mock("../seeds.service");

describe("SeedsController Unit Tests", () => {
  let app: INestApplication;
  let controller: SeedsController;
  let service: SeedsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SeedsController],
      providers: [SeedsService],
    }).compile();

    app = module.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();

    controller = module.get<SeedsController>(SeedsController);
    service = module.get<SeedsService>(SeedsService);

    jest.clearAllMocks();
  });

  it("sould be defined", () => {
    expect(controller).toBeDefined();
  });

  describe("getAllseeds", () => {
    describe("when getAllTasks is called", () => {
      let seeds: Seed[];

      beforeEach(async () => {
        const query: SeedQueryParams = {};
        seeds = await controller.getAllSeeds(query);
      });

      test("then it should call the service", () => {
        expect(service.getAllSeeds).toBeCalled();
      });

      test("then it should return an array of seeds", () => {
        expect(seeds).toEqual([seedStub()]);
      });
    });
  });

  describe("getSeedById", () => {
    describe("when getById is called", () => {
      let seed: Seed;

      beforeEach(async () => {
        seed = await controller.getSeedById(seedStub()._id);
      });

      it("then it should call the seeds service", () => {
        expect(service.getSeedById).toBeCalledWith(seedStub()._id);
      });

      it("then should return a single seed", () => {
        expect(seed).toEqual(seedStub());
      });
    });
  });

  describe("createSeed", () => {
    describe("when createSeed is called correctly", () => {
      let seed: Seed;
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
      beforeEach(async () => {
        seed = await controller.createSeed(dto);
      });

      it("should call the seedsService", () => {
        expect(service.createSeed).toBeCalledWith(dto);
      });

      it("should return the new Seed", () => {
        expect(seed).toEqual(seedStub());
      });
    });
  });

  describe("updateUpdate", () => {
    describe("when createSeed is called with correct dto", () => {
      const objectID = ObjectId.createFromHexString("638e04dab2bcf419a0c362c1");
      let seed: Seed;
      const dto: UpdateSeedDto = {
        name: "first seed",
      };
      beforeEach(async () => {
        seed = await controller.updateSeed(objectID, dto);
      });

      it("should call the seedsService", () => {
        expect(service.updateSeed).toBeCalledWith(objectID, dto);
      });

      it("should return the updated Seed", () => {
        expect(seed).toEqual(seedStub());
      });
    });
  });

  describe("deleteSeed", () => {
    expect(true);
  });
});
