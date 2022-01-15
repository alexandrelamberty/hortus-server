import { Test, TestingModule } from '@nestjs/testing';
import { SeedController } from './seed.controller';
import { SeedService } from '../providers/seed.service';
import { CreateSeedDto } from '../dto/seed/create-seed.dto';

describe("SeedController Unit Tests", () => {
  let seedController: SeedController;
  let spyService: SeedService
  beforeAll(async () => {
    const ApiServiceProvider = {
      provide: SeedService,
      useFactory: () => ({
        create: jest.fn(() => []),
        findAll: jest.fn(() => []),
        findOne: jest.fn(() => { }),
        update: jest.fn(() => { }),
        remove: jest.fn(() => { })
      })
    }
    const app: TestingModule = await Test.createTestingModule({
      controllers: [SeedController],
      providers: [SeedService, ApiServiceProvider],
    }).compile();

    seedController = app.get<SeedController>(SeedController);
    spyService = app.get<SeedService>(SeedService);
  })

  it("calling saveNotes method", () => {
    const dto = new CreateSeedDto();
    expect(seedController.create(dto,null)).not.toEqual(null);
  })

  it("calling saveNotes method 2", () => {
    const dto = new CreateSeedDto();
    seedController.create(dto,null);
    expect(spyService.create).toHaveBeenCalled();
    expect(spyService.create).toHaveBeenCalledWith(dto, "nothing_for_now");
  })

  it("calling getAllNote method", () => {
    seedController.findAll();
    expect(spyService.findAll).toHaveBeenCalled();
  })

  it("calling find NoteById method", () => {
    seedController.findOne('2');
    expect(spyService.findOne).toHaveBeenCalled();
  })

});
