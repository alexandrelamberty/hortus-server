import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { SeedModule } from '../src/seeds/seed.module';
import { SpeciesService } from '../src/seeds/providers/species.service';
import { INestApplication } from '@nestjs/common';

describe('Plant', () => {
  let app: INestApplication;
  let speciesService = { listSpecies: () => ['test'] };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [SeedModule],
    })
      .overrideProvider(SpeciesService)
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