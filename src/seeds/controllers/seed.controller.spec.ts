import { Test, TestingModule } from '@nestjs/testing';
import { Schema, Types } from 'mongoose';
import { CreateSeedDto } from '../dto/create-seed.dto';
import { SeedService } from '../providers/seed.service';
import { SeedController } from './seed.controller';

describe("SeedController Unit Tests", () => {
  let seedController: SeedController;
  let spyService: SeedService
  beforeAll(async () => {
    const ApiServiceProvider = {
      provide: SeedService,
      useFactory: () => ({
        listSeeds: jest.fn(() => []),
        createSeed: jest.fn(() => { }),
        readSeed: jest.fn(() => { }),
        updateSeed: jest.fn(() => { }),
        deleteSeed: jest.fn(() => { })
      })
    }
    const app: TestingModule = await Test.createTestingModule({
      controllers: [SeedController],
      providers: [SeedService, ApiServiceProvider],
    }).compile();

    seedController = app.get<SeedController>(SeedController);
    spyService = app.get<SeedService>(SeedService);
  })

  it("calling createSeed method", () => {
    const dto = new CreateSeedDto();
    expect(seedController.createSeed(dto)).not.toEqual(null);
  })

  it("calling createSeed method 2", () => {
    const dto = new CreateSeedDto();
    seedController.createSeed(dto);
    expect(spyService.createSeed).toHaveBeenCalled();
    expect(spyService.createSeed).toHaveBeenCalledWith(dto);
  })

  it("calling getAllSeeds method", () => {
    seedController.listSeeds({ skip: 0, limit: 0 });
    expect(spyService.listSeeds).toHaveBeenCalled();
  })

  it("calling findSeedById method", () => {
    seedController.readSeed(new Types.ObjectId('j'));
    expect(spyService.readSeed).toHaveBeenCalled();
  })

});
