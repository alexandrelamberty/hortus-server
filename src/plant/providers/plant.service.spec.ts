import { Test, TestingModule } from "@nestjs/testing";
import { PlantService } from "../providers/plant.service";
import { getModelToken } from "@nestjs/mongoose";
import { Model, Query } from "mongoose";
import { Plant } from "../interfaces/plant.interface";
import { PlantDocument } from "../schemas/plant.schema";
import { createMock } from "@golevelup/ts-jest";

const mockPlant = (
  _id = "638e04dab2bcf419a0c362c1",
  name = "Carrot",
  binomial = "Daucus carota",
  family = "Apiaceae",
  genus = "Daucus",
  species = "D. carota",
  image = "638e04dab2bcf419a0c362c1.webp"
): Plant => ({
  _id,
  name,
  binomial,
  family,
  genus,
  species,
  image,
});

const mockPlantDoc = (mock?: Partial<Plant>): Partial<PlantDocument> => ({
  _id: mock?._id || "638e04dab2bcf419a0c362c1",
  name: mock?.name || "Carrot",
  binomial: mock?.binomial || "Daucus carota",
  family: mock?.family || "Apiaceae",
  genus: mock?.genus || "Daucus",
  species: mock?.species || "D. carota",
  image: mock?.image || "638e04dab2bcf419a0c362c1.webp",
});

const plantArray = [
  mockPlant(),
  mockPlant("Vitani", "a new uuid", "", "Tabby"),
  mockPlant("Simba", "the king", "", "Lion"),
];

const plantDocArray = [
  mockPlantDoc(),
  mockPlantDoc({
    _id: "a new uuid",
    name: "Vitani",
    binomial: "",
    family: "Tabby",
    genus: "Tabby",
    species: "Tabby",
  }),
];

describe("PlantService", () => {
  let service: PlantService;
  let model: Model<Plant>;

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
            find: jest.fn(),
            findById: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            create: jest.fn(),
            remove: jest.fn(),
            exec: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<PlantService>(PlantService);
    model = module.get<Model<Plant>>(getModelToken("Plant"));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("sould be defined", () => {
    expect(service).toBeDefined();
  });

  describe("listPlants", () => {
    it("should return all plants", async () => {
      jest.spyOn(model, "find").mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce(plantDocArray),
      } as any);
      const plants = await service.getAll();
      expect(plants).toEqual(plantArray);
    });
  });

  it("should getOne by id", async () => {
    jest.spyOn(model, "findOne").mockReturnValueOnce(
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
    const foundPlant = await service.getOne("123");
    expect(foundPlant).toEqual(findMockPlant);
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
    const newPlant = await service.insertOne({
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
