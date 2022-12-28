import { Test, TestingModule } from "@nestjs/testing";
import { Plant } from "@plant/schemas/plant.schema";
import { plantStub } from "@plant/test/stubs/plant.stub";
import { CreatePlantDto } from "../dto/create-plant.dto";
import { PlantService } from "../providers/plant.service";
import { PlantController } from "../controllers/plant.controller";

jest.mock("@plant/providers/plant.service");

describe("PlantController Unit Tests", () => {
  let controller: PlantController;
  let service: PlantService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlantController],
      providers: [PlantService],
    }).compile();

    controller = module.get<PlantController>(PlantController);
    service = module.get<PlantService>(PlantService);

    jest.clearAllMocks();
  });

  it("sould be defined", () => {
    expect(controller).toBeDefined();
  });

  describe("listPlants", () => {
    describe("when listPlants is called", () => {
      let plants: Plant[];

      beforeEach(async () => {
        plants = await controller.listPlants({});
      });

      test("then it should call service", () => {
        expect(service.findAll).toBeCalled();
      });

      test("then it should return an array of plants", () => {
        expect(plants).toEqual([plantStub()]);
      });
    });
  });

  describe("getById", () => {
    describe("when getById is called", () => {
      let plant: Plant;

      beforeEach(async () => {
        plant = await controller.getById(plantStub().plantId);
      });

      it("should call plantService", () => {
        expect(service.getById).toBeCalledWith(plantStub().plantId);
      });

      it("should return a single plant", () => {
        expect(plant).toEqual(plantStub());
      });
    });
  });

  describe("createPlant", () => {
    expect(true);
  });

  describe("updatePlant", () => {
    expect(true);
  });

  describe("deletePlantByIds", () => {
    expect(true);
  });
});
