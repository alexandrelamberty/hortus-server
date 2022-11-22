import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { PlantModule } from '../src/plant/plant.module';
import { PlantService } from '../src/plant/providers/plant.service';
import { INestApplication } from '@nestjs/common';

describe('Plant', () => {
  let app: INestApplication;
  let speciesService = { listSpecies: () => ['test'] };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [PlantModule],
    })
      .overrideProvider(PlantService)
      .useValue(speciesService)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`/GET plants`, () => {
    return request(app.getHttpServer())
      .get('/plants')
      .expect(200)
      .expect({
        data: speciesService.listSpecies(),
      });
  });

  afterAll(async () => {
    await app.close();
  });
});