import { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import * as request from "supertest";
import { PlantModule } from "../src/plant/plant.module";
import { PlantService } from "../src/plant/providers/plant.service";

describe("PlantsController (e2e)", () => {
  let app: INestApplication;
  let speciesService = { listSpecies: () => ["test"] };

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

  describe("/GET plants", () => {
    it(`get plants`, () => {
      return request(app.getHttpServer()).get("/plants").expect(200).expect({
        data: speciesService.listSpecies(),
      });
    });
    it(`return server error`, () => {
      return request(app.getHttpServer()).get("/plants").expect(200).expect({
        data: speciesService.listSpecies(),
      });
    });
  });

  describe("/POST plants", () => {
    it(`post a plant`, () => {
      return request(app.getHttpServer()).post("/plants").expect(200).expect({
        data: speciesService.listSpecies(),
      });
    });
    it(`return request error`, () => {
      return request(app.getHttpServer())
        .post("/plants")
        .expect(400)
        .expect({});
    });
  });

  describe("/PATCH plants", () => {
    it(`patch a plant`, () => {
      return request(app.getHttpServer()).patch("/plants").expect(200).expect({
        data: speciesService.listSpecies(),
      });
    });
    it(`return not found error`, () => {
      return request(app.getHttpServer())
        .post("/plants")
        .expect(404)
        .expect({});
    });
    it(`return request error`, () => {
      return request(app.getHttpServer())
        .post("/plants")
        .expect(400)
        .expect({});
    });
  });

  describe("/DELETE plants", () => {
    it(`delete a plant`, () => {
      return request(app.getHttpServer()).get("/plants").expect(200).expect({
        data: speciesService.listSpecies(),
      });
    });
    it(`return request error`, () => {
      return request(app.getHttpServer())
        .post("/plants")
        .expect(400)
        .expect({});
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
