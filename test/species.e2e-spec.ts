import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { SeedModule } from '../src/seeds/seed.module';
import { SpeciesService } from '../src/seeds/providers/species.service';
import { INestApplication } from '@nestjs/common';

describe('Cats', () => {
  let app: INestApplication;
  let speciesService = { findAll: () => ['test'] };

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

  it(`/GET cats`, () => {
    return request(app.getHttpServer())
      .get('/cats')
      .expect(200)
      .expect({
        data: speciesService.findAll(),
      });
  });

  afterAll(async () => {
    await app.close();
  });
});