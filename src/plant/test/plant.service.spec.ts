import { createMock } from "@golevelup/ts-jest";
import { getModelToken } from "@nestjs/mongoose";
import { Test, TestingModule } from "@nestjs/testing";
import { Model, Query } from "mongoose";
import { PlantService } from "../providers/plant.service";

import { Plant, PlantDocument } from "../schemas/plant.schema";
import { plantStub } from "./stubs/plant.stub";

const mockPlant = (
  id = "638e04dab2bcf419a0c362c1",
  name = "Carrot",
  binomial = "Daucus carota",
  family = "Apiaceae",
  genus = "Daucus",
  species = "D. carota",
  image = "638e04dab2bcf419a0c362c1.webp"
): Plant => ({
  _id: id,
  name,
  binomial,
  family,
  genus,
  species,
  image,
});

const mockPlantDoc = (mock?: Partial<Plant>): Partial<PlantDocument> => ({
  id: mock?._id || "638e04dab2bcf419a0c362c1",
  name: mock?.name || "Carrot",
  binomial: mock?.binomial || "Daucus carota",
  family: mock?.family || "Apiaceae",
  genus: mock?.genus || "Daucus",
  species: mock?.species || "D. carota",
  image: mock?.image || "638e04dab2bcf419a0c362c1.webp",
});

const plantArray = [
  mockPlant(),
  mockPlant("638e04dab2bcf419a0c362c1", "a new uuid", "", "Tabby"),
  mockPlant("638e04dab2bcf419a0c362c1", "the king", "", "Lion"),
];

const plantDocArray = [
  mockPlantDoc(),
  mockPlantDoc({
    _id: "638e04dab2bcf419a0c362c1",
    name: "Vitani",
    binomial: "",
    family: "Tabby",
    genus: "Tabby",
    species: "Tabby",
  }),
];

const plantDocRespose = {
  plants: plantDocArray,
  count: 2,
};

describe("PlantService", () => {
  let service: PlantService;
  let model: Model<PlantDocument>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PlantService,
        {
          provide: getModelToken("Plant"),
          // notice that only the functions we call from the model are mocked
          useValue: {
            new: jest.fn().mockResolvedValue(mockPlant()),
            constructor: jest.fn().mockResolvedValue(mockPlant()),
            // FIXME: Mock implemention for skip() and value ?
            find: jest.fn().mockResolvedValue(plantDocRespose),
            findById: jest.fn(),
            findByIdAndDelete: jest.fn(),
            findByIdAndUpdate: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            create: jest.fn(),
            remove: jest.fn(),
            sort: jest.fn(),
            skip: jest.fn(),
            count: jest.fn(),
            exec: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<PlantService>(PlantService);
    model = module.get<Model<PlantDocument>>(getModelToken("Plant"));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("sould be defined", () => {
    expect(service).toBeDefined();
  });

  describe("listPlants", () => {
    describe("when getAll is called", () => {
      let plants: Plant[];

      beforeEach(async () => {
        jest.spyOn(model, "find");
        plants = await service.findAll(0, 0);
      });

      it("should return all plants", async () => {
        expect(model.find).toBeCalled();
      });

      it("should return all plants", async () => {
        expect(plants).toEqual(plantStub());
      });
    });
  });

  describe("listPlants", () => {
    it("should getOne by id", async () => {
      jest.spyOn(model, "findById").mockReturnValueOnce(
        createMock<Query<PlantDocument, PlantDocument>>({
          exec: jest.fn().mockResolvedValueOnce(
            mockPlantDoc({
              _id: "123",
              name: "Carrot",
              binomial: "Daucus carrota",
              family: "Apiaceae",
              genus: "Daucus",
              species: "D. carrota",
            })
          ),
        }) as any
      );
      const findMockPlant = mockPlant(
        "123",
        "Carrot",
        "Daucus carrota",
        "Apiaceae",
        "Daucus",
        "D. carrota"
      );
      const foundPlant = await service.getById("123");
      expect(foundPlant).toEqual(findMockPlant);
    });
  });

  it("should insert a new plant", async () => {
    jest.spyOn(model, "create").mockImplementationOnce(() =>
      Promise.resolve({
        _id: "123",
        name: "Carrot",
        binomial: "Daucus carota",
        family: "Apiaceae",
        genus: "Daucus",
        species: "D. carrota",
        image: "638e04dab2bcf419a0c362c1.webp",
      })
    );
    const newPlant = await service.create({
      name: "Carrot",
      binomial: "Daucus carota",
      family: "Apiaceae",
      genus: "Daucus",
      species: "D. carrota",
    });
    expect(newPlant).toEqual(
      mockPlant(
        "123",
        "Carrot",
        "Daucus carota",
        "Apiaceae",
        "Daucus",
        "D. carrota"
      )
    );
  });
});
