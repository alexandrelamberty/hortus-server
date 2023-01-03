import { Test, TestingModule } from "@nestjs/testing";
import { Types } from "mongoose";
import { CreatePlantDto } from "../dto/create-plant.dto";
import { QueryPlantParams } from "../dto/query-plant.dto";
import { UpdatePlantDto } from "../dto/update-plant.dto";
import { PlantsService } from "../plants.service";
import { plantStub } from "./stubs/plant.stub";

jest.mock("../plants.service");

describe("PlantsService", () => {
  let service: PlantsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlantsService],
    }).compile();

    service = module.get<PlantsService>(PlantsService);
  });

  describe("getAllPlants", () => {
    describe("when getAllTasks is called", () => {
      it("should return an array of Plants", async () => {
        const query: QueryPlantParams = {
          page: 1,
          limit: 10,
        };
        const result = await service.getAllPlants(query);
        expect(result).toEqual([plantStub()]);
      });
    });
  });

  describe("getPlantById", () => {
    const objectID = Types.ObjectId.createFromHexString(
      "638e04dab2bcf419a0c362c1"
    );
    it("should return a Plant", async () => {
      const result = await service.getPlantById(objectID);
      expect(result).toEqual(plantStub());
    });

    it("should throw an error if Plant is not found", async () => {
      try {
        const invalidObjectID = Types.ObjectId.createFromHexString(
          "638e04dab2bcf419a0c362c"
        );
        await service.getPlantById(invalidObjectID);
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
      }
    });
  });

  describe("createPlant", () => {
    it("should create a Plant", async () => {
      const dto: CreatePlantDto = {
        name: "Plant title",
        family: "",
        genus: "",
        species: "",
      };
      const result = await service.createPlant(dto);
      expect(result).toEqual(plantStub());
    });
  });

  describe("updatePlant", () => {
    it("should update a Plant", async () => {
      const objectID = Types.ObjectId.createFromHexString(
        "638e04dab2bcf419a0c362c1"
      );
      const dto: UpdatePlantDto = {
        name: "Updated Plant title",
      };
      const result = await service.updatePlant(objectID, dto);
      expect(result).toEqual(plantStub());
    });

    it("should throw an error if Plant is not found", async () => {
      try {
        const invalidObjectID = Types.ObjectId.createFromHexString(
          "638e04dab2bcf419a0c362c"
        );
        const dto: UpdatePlantDto = {
          name: "Updated Plant title",
        };
        await service.updatePlant(invalidObjectID, dto);
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
      }
    });
  });

  describe("deletePlant", () => {
    describe("when deletePlant is called", () => {
      it("should delete a Plant", async () => {
        const objectID = Types.ObjectId.createFromHexString(
          "638e04dab2bcf419a0c362c1"
        );
        const result = await service.deletePlant(objectID);
        expect(result).toEqual(plantStub());
      });

      it("should throw an error if Plant is not found", async () => {
        try {
          const invalidObjectID = Types.ObjectId.createFromHexString(
            "638e04dab2bcf419a0c362c"
          );
          await service.deletePlant(invalidObjectID);
        } catch (error) {
          expect(error).toBeInstanceOf(Error);
        }
      });
    });
  });
});
