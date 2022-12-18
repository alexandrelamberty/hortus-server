import { Test, TestingModule } from "@nestjs/testing";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

describe("AppController", () => {
  let appController: AppController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = module.get<AppController>(AppController);
  });

  describe("getHome()", () => {
    it("should return 'Nidus API'", () => {
      expect(appController.getHome()).toBe("Nidus API");
    });
  });

  describe("getVersion()", () => {
    it("should return '1.0.0'", () => {
      expect(appController.getVersion()).toBe("1.0.0");
    });
  });
});
