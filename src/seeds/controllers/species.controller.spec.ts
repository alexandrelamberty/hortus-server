import { Schema, Types } from 'mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateSpeciesDto } from '../dto/species/create-species.dto';
import { SpeciesService } from '../providers/species.service';
import { SpeciesController } from './species.controller';

describe("SpeciesController Unit Tests", () => {
  let speciesController: SpeciesController;
  let spyService: SpeciesService;
  beforeAll(async () => {
    const ApiServiceProvider = {
      provide: SpeciesService,
      useFactory: () => ({
        listSpecies: jest.fn(() => []),
        createSpecies: jest.fn(() => []),
        readSpecies: jest.fn(() => { }),
        updateSpecies: jest.fn(() => { }),
        deleteSpecies: jest.fn(() => { })
      })
    }
    const app: TestingModule = await Test.createTestingModule({
      controllers: [SpeciesController],
      providers: [SpeciesService, ApiServiceProvider],
    }).compile();

    speciesController = app.get<SpeciesController>(SpeciesController);
    spyService = app.get<SpeciesService>(SpeciesService);
  })

  it("call createSpecies method", () => {
    const dto = new CreateSpeciesDto();
    expect(speciesController.createSpecies(dto)).not.toEqual(null);
  })

  it("call createSpecies method 2", () => {
    const dto = new CreateSpeciesDto();
    speciesController.createSpecies(dto);
    expect(spyService.createSpecies).toHaveBeenCalled();
    expect(spyService.createSpecies).toHaveBeenCalledWith(dto);
  })

  it("call getAllSpecies method", () => {
    speciesController.listSpecies({skip:0,limit:0});
    expect(spyService.listSpecies).toHaveBeenCalled();
  })

  it("call findSpeciesById method", () => {
    speciesController.readSpecies(new Schema.Types.ObjectId('j'));
    expect(spyService.readSpecies).toHaveBeenCalled();
  })

});
