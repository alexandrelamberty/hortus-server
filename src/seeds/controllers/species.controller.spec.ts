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
        create: jest.fn(() => []),
        findAll: jest.fn(() => []),
        findOne: jest.fn(() => { }),
        update: jest.fn(() => { }),
        remove: jest.fn(() => { })
      })
    }
    const app: TestingModule = await Test.createTestingModule({
      controllers: [SpeciesController],
      providers: [SpeciesService, ApiServiceProvider],
    }).compile();

    speciesController = app.get<SpeciesController>(SpeciesController);
    spyService = app.get<SpeciesService>(SpeciesService);
  })

  it("calling createSpecies method", () => {
    const dto = new CreateSpeciesDto();
    expect(speciesController.create(dto)).not.toEqual(null);
  })

  it("calling createSpecies method 2", () => {
    const dto = new CreateSpeciesDto();
    speciesController.create(dto);
    expect(spyService.create).toHaveBeenCalled();
    expect(spyService.create).toHaveBeenCalledWith(dto);
  })

  it("calling getAllSpecies method", () => {
    speciesController.findAll({skip:0,limit:0});
    expect(spyService.findAll).toHaveBeenCalled();
  })

  it("calling findSpeciesById method", () => {
    speciesController.read(new Schema.Types.ObjectId('j'));
    expect(spyService.read).toHaveBeenCalled();
  })

});
