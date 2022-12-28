import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import * as request from "supertest";
import { AppModule } from "../src/app/app.module";

describe("AppController (e2e)", () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe("[GET] /", () => {
    it("sould return 'Nidus API'", () => {
      return request(app.getHttpServer())
        .get("/")
        .expect(200)
        .expect("Nidus API");
    });
  });

  describe("[GET] /", () => {
    it("/version (GET)", () => {
      return request(app.getHttpServer())
        .get("/version")
        .expect(200)
        .expect("1.0.0");
    });
  });
});
