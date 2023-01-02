import { createMock } from "@golevelup/ts-jest";
import { getModelToken } from "@nestjs/mongoose";
import { Test, TestingModule } from "@nestjs/testing";
import { ObjectId } from "mongodb";
import { Model, Query } from "mongoose";
import { PlantsRepository } from "../plants.repository";
import { Plant, PlantDocument } from "../schemas/plant.schema";
import { plantStub } from "./stubs/plant.stub";
import { PlantsQueryParams } from "../dto/plant-query.dto";
import { CreatePlantDto } from "../dto/create-plant.dto";

// jest.mock("../plants.repository");

describe("PlantsRepository", () => {
  let repository: PlantsRepository;
  let model: Model<PlantDocument>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PlantsRepository,
        {
          provide: getModelToken("Plant"),
          useValue: {
            new: jest.fn().mockResolvedValue(plantStub()),
            constructor: jest.fn().mockResolvedValue(plantStub()),
            find: jest.fn().mockImplementation(() => ({
              sort: jest.fn().mockImplementation((...args) => ({
                skip: jest.fn().mockImplementation((...arg) => ({
                  populate: jest.fn().mockImplementation((...arg) => ({
                    limit: jest.fn().mockImplementation((...arg) => ({
                      exec: jest.fn().mockReturnValueOnce([plantStub]),
                    })),
                  })),
                })),
              })),
            })),
            findById: jest.fn().mockResolvedValueOnce(plantStub()),
            findByIdAndDelete: jest.fn().mockResolvedValueOnce(plantStub()),
            findByIdAndUpdate: jest.fn().mockResolvedValueOnce(plantStub()),
            findOne: jest.fn().mockImplementation(() => ({
              exec: jest.fn().mockImplementation((...arg) => plantStub()),
            })),
            update: jest.fn().mockResolvedValueOnce(plantStub()),
            create: jest.fn().mockResolvedValueOnce(plantStub()),
            remove: jest.fn().mockResolvedValueOnce(plantStub()),
            limit: jest.fn().mockResolvedValueOnce([plantStub()]),
            count: jest.fn(),
            exec: jest.fn(),
          },
        },
      ],
    }).compile();

    repository = module.get<PlantsRepository>(PlantsRepository);
    model = module.get<Model<PlantDocument>>(getModelToken("Plant"));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("sould be defined", () => {
    expect(repository).toBeDefined();
  });

  describe("getAllPlants", () => {
    describe("when getPlants is called", () => {
      let plants: Plant[];

      beforeEach(async () => {
        jest.spyOn(model, "find").mockReturnValueOnce(
          createMock<Query<PlantDocument, PlantDocument>>({
            find: jest.fn().mockImplementation(() => ({
              skip: jest.fn().mockImplementation((...arg) => ({
                limit: jest.fn().mockImplementation((...arg) => ({
                  exec: jest.fn().mockImplementation((...arg) => [plantStub()]),
                })),
              })),
            })),
          }) as any
        );
        const query: PlantsQueryParams = {
          page: 1,
          limit: 10,
        };
        plants = await repository.getPlants(query);
      });

      it("should call model find", async () => {
        expect(model.find).toBeCalled();
      });

      it("should return all plants", async () => {
        expect(plants).toEqual([plantStub()]);
      });
    });
  });

  describe("createPlant", () => {
    it("should insert a new plant", async () => {
      const dto: CreatePlantDto = {
        name: "Plant title",
        family: "",
        genus: "",
        species: "",
      };

      jest
        .spyOn(model, "create")
        .mockImplementationOnce(() => Promise.resolve(plantStub()));

      const newPlant = await repository.createPlant(dto);

      expect(newPlant).toEqual(plantStub());
    });
  });

  describe("getById", () => {
    it("should getOne by id", async () => {
      const objectID = ObjectId.createFromHexString("638e04dab2bcf419a0c362c1");

      jest.spyOn(model, "findById").mockReturnValueOnce(
        createMock<Query<PlantDocument, PlantDocument>>({
          exec: jest.fn().mockResolvedValueOnce(plantStub()),
        }) as any
      );

      const foundPlant = await repository.getPlantById(objectID);
      expect(foundPlant).toEqual(plantStub());
    });
  });
});
