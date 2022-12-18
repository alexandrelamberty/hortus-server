import { Test, TestingModule } from "@nestjs/testing";
import { CreatePlantDto } from "../dto/create-plant.dto";
import { UpdatePlantDto } from "../dto/update-plant.dto";
import { PlantService } from "../providers/plant.service";
import { PlantController } from "./plant.controller";

const testPlant1 = "Carrot";
const testFamily1 = "Apiaceae";

describe("PlantController Unit Tests", () => {
  let controller: PlantController;
  let service: PlantService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlantController],
      // If you've looked at the complex sample you'll notice that these functions
      // are a little bit more in depth using mock implementation
      // to give us a little bit more control and flexibility in our tests
      // this is not necessary, but can sometimes be helpful in a test scenario
      providers: [
        {
          provide: PlantService,
          useValue: {
            getAll: jest.fn().mockResolvedValue([
              { name: testPlant1, family: testFamily1, genus: "D. carota" },
              {
                name: "Test Plant 2",
                family: "Test Family 2",
                genus: "",
              },
              { name: "Test Plant 3", family: "Test Family 3", genus: "" },
            ]),
            getById: jest.fn().mockImplementation((id: string) =>
              Promise.resolve({
                name: testPlant1,
                family: testFamily1,
                genus: "D. carota",
                _id: id,
              })
            ),
            // getOneByName: jest
            //   .fn()
            //   .mockImplementation((name: string) =>
            //     Promise.resolve({ name, family: testPlant1, age: 4 })
            //   ),
            insert: jest
              .fn()
              .mockImplementation((plant: CreatePlantDto) =>
                Promise.resolve({ _id: "a uuid", ...plant })
              ),
            update: jest
              .fn()
              .mockImplementation((plant: UpdatePlantDto) =>
                Promise.resolve({ _id: "a uuid", ...plant })
              ),
            delete: jest.fn().mockResolvedValue({ deleted: true }),
          },
        },
      ],
    }).compile();

    controller = module.get<PlantController>(PlantController);
    service = module.get<PlantService>(PlantService);
  });

  it("sould be defined", () => {
    expect(controller).toBeDefined();
  });

  describe("listPlants", () => {
    it("should get an array of plants", () => {
      expect(controller.listPlants({})).resolves.toEqual([
        {
          name: testPlant1,
          family: testFamily1,
          genus: "D. carota",
        },
        {
          name: "Test Plant 2",
          family: "Test Family 2",
          genus: "",
        },
        {
          name: "Test Plant 3",
          family: "Test Family 3",
          genus: "",
        },
      ]);
    });
  });

  describe("getById", () => {
    it("should get a single plant", () => {
      expect(controller.getById("a strange id")).resolves.toEqual({
        _id: "a strange id",
        name: testPlant1,
        family: testFamily1,
        genus: "D. carota",
      });
      expect(controller.getById("a different id")).resolves.toEqual({
        _id: "a different id",
        name: testPlant1,
        family: testFamily1,
        genus: "D. carota",
      });
    });
  });

  describe("createPlant", () => {
    it("should create a new plant", () => {
      const dto: CreatePlantDto = {
        name: "New Cat 1",
        binomial: "",
        family: "New Breed 1",
        genus: "4",
        species: "",
      };
      expect(controller.insert(dto, "")).resolves.toEqual({
        _id: "a uuid",
        ...dto,
      });
    });
  });

  describe("updatePlant", () => {
    it("should update a new plant", () => {
      const id = "";
      const dto: UpdatePlantDto = {
        _id: "a uuid",
        name: "New Cat 1",
        family: "New Breed 1",
        genus: "4",
        species: "",
      };

      expect(controller.update(id, dto, null)).resolves.toEqual({
        _id: id,
        ...dto,
      });
    });
  });

  describe("deletePlantByIds", () => {
    it("should return that it deleted a plant", () => {
      expect(
        controller.deletePlantByIds(
          "638e04dab2bcf419a0c362c1,638e04dab2bcf419a0c362c1"
        )
      ).resolves.toEqual({
        deleted: true,
      });
    });
    it("should return that it did not delete a cat", () => {
      const deleteSpy = jest
        .spyOn(service, "delete")
        .mockResolvedValueOnce({ deleted: false });
      expect(
        controller.deletePlantByIds("a uuid that does not exist")
      ).resolves.toEqual({ deleted: false });
      expect(deleteSpy).toBeCalledWith("a uuid that does not exist");
    });
  });
});
