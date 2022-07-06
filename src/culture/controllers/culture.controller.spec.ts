import { Test, TestingModule } from '@nestjs/testing';
import { CultureController } from './culture.controller';
import { CultureService } from '../providers/culture.service';
import { CreateCultureDto } from '../dto/create-culture.dto';
import { Schema } from 'mongoose';

describe("CultureController Unit Tests", () => {
  let cultureController: CultureController;
  let spyService: CultureService

  beforeAll(async () => {
    const ApiServiceProvider = {
      provide: CultureService,
      useFactory: () => ({
        listCultures: jest.fn(({skip,limit}) => []),
        createCulture: jest.fn(() => []),
        readCulture: jest.fn(() => { }),
        updateCulture: jest.fn(() => { }),
        deleteCulture: jest.fn(() => { })
      })
    }

    const app: TestingModule = await Test.createTestingModule({
      controllers: [CultureController],
      providers: [CultureService, ApiServiceProvider],
    }).compile();

    cultureController = app.get<CultureController>(CultureController);
    spyService = app.get<CultureService>(CultureService);
  })

  it("calling createCulture method", () => {
    const dto = new CreateCultureDto();
    expect(cultureController.createCulture(dto)).not.toEqual(null);
  })

  it("calling createCulture method 2", () => {
    const dto = new CreateCultureDto();
    cultureController.createCulture(dto);
    expect(spyService.createCulture).toHaveBeenCalled();
    expect(spyService.createCulture).toHaveBeenCalledWith(dto);
  })

  it("calling getAllCultures method", () => {
    cultureController.listCultures({ skip: 0, limit: 10 });
    expect(spyService.listCultures).toHaveBeenCalled();
  })

  it("calling findCultureById method", () => {
    cultureController.readCulture(new Schema.Types.ObjectId('j'));
    expect(spyService.readCulture).toHaveBeenCalled();
  })

});
