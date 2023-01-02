import { INestApplication, ValidationPipe } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { ObjectId } from "mongodb";
import { PlantsController } from "../controllers/plants.controller";
import { CreatePlantDto } from "../dto/create-plant.dto";
import { PlantsQueryParams } from "../dto/query-plants.dto";
import { PlantsService } from "../plants.service";
import { Plant } from "../schemas/plant.schema";
import { plantStub } from "./stubs/plant.stub";

jest.mock("../plants.service");

// jest.mock("../plants.controller");

describe("PlantsController Unit Tests", () => {
  let app: INestApplication;
  let controller: PlantsController;
  let service: PlantsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlantsController],
      providers: [PlantsService],
    }).compile();

    app = module.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();

    controller = module.get<PlantsController>(PlantsController);
    service = module.get<PlantsService>(PlantsService);

    jest.clearAllMocks();
  });

  it("sould be defined", () => {
    expect(controller).toBeDefined();
  });

  describe("getAllplants", () => {
    describe("when getAllTasks is called", () => {
      let plants: Plant[];

      beforeEach(async () => {
        const query: PlantsQueryParams = {};
        plants = await controller.getAllPlants(query);
      });

      test("then it should call the service", () => {
        expect(service.getAllPlants).toBeCalled();
      });

      test("then it should return an array of plants", () => {
        expect(plants).toEqual([plantStub()]);
      });
    });
  });

  describe("getPlantById", () => {
    describe("when getById is called", () => {
      let plant: Plant;

      beforeEach(async () => {
        plant = await controller.getPlantById(plantStub()._id);
      });

      it("then it should call the plants service", () => {
        expect(service.getPlantById).toBeCalledWith(plantStub()._id);
      });

      it("then should return a single plant", () => {
        expect(plant).toEqual(plantStub());
      });
    });
  });

  describe("createPlant", () => {
    describe("when createPlant is called correctly", () => {
      let plant: Plant;
      const dto: CreatePlantDto = {
        name: "first plant",
        family: "",
        genus: "",
        species: "",
      };
      beforeEach(async () => {
        plant = await controller.createPlant(dto, "sdfsdf");
      });

      it("should call the plantsService", () => {
        expect(service.createPlant).toBeCalledWith(dto);
      });

      it("should return the new Plant", () => {
        expect(plant).toEqual(plantStub());
      });
    });
  });

  describe("updateUpdate", () => {
    describe("when createPlant is called with correct dto", () => {
      const objectID = ObjectId.createFromHexString("638e04dab2bcf419a0c362c1");
      let plant: Plant;
      const dto: CreatePlantDto = {
        name: "first plant",
        family: "",
        genus: "",
        species: "",
      };
      beforeEach(async () => {
        plant = await controller.updatePlant(objectID, dto, "");
      });

      it("should call the plantsService", () => {
        expect(service.updatePlant).toBeCalledWith(objectID, dto);
      });

      it("should return the updated Plant", () => {
        expect(plant).toEqual(plantStub());
      });
    });
  });

  describe("deletePlant", () => {
    expect(true);
  });
});
