import { Schema, Types } from 'mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { CreatePlantDto } from '../dto/create-plant.dto';
import { PlantService } from '../providers/plant.service';
import { PlantController } from './plant.controller';
import { UploadedFile, UploadedFiles } from '@nestjs/common';

describe("PlantController Unit Tests", () => {
  let plantController: PlantController;
  let spyService: PlantService;
  beforeAll(async () => {
    const ApiServiceProvider = {
      provide: PlantService,
      useFactory: () => ({
        listPlants: jest.fn(() => []),
        createPlant: jest.fn(() => []),
        getPlant: jest.fn(() => { }),
        updateSpecies: jest.fn(() => { }),
        deleteSpecies: jest.fn(() => { })
      })
    }
    const app: TestingModule = await Test.createTestingModule({
      controllers: [PlantController],
      providers: [PlantService, ApiServiceProvider],
    }).compile();

    plantController = app.get<PlantController>(PlantController);
    spyService = app.get<PlantService>(PlantService);
  })

  it("call createPlant method with an non null object", () => {
    const dto = new CreatePlantDto();
    expect(plantController.createPlant(dto)).not.toEqual(null);
  })

  it("call createPlant method with non null object ", () => {
    const dto = new CreatePlantDto();
    const file = new UploadedFile()
    plantController.createPlant(dto,);
    expect(spyService.createPlant).toHaveBeenCalled();
    expect(spyService.createPlant).toHaveBeenCalledWith(dto);
  })

  it("call getAllSpecies method", () => {
    plantController.listPlants({ skip: 0, limit: 0 });
    expect(spyService.listPlants).toHaveBeenCalled();
  })

  it("call findSpeciesById method", () => {
    plantController.readPlant(new Types.ObjectId(''));
    expect(spyService.readPlant).toHaveBeenCalled();
  })

});
