import { Test, TestingModule } from "@nestjs/testing";
import { AppService } from "@app/app.service";

describe("AppService", () => {
  let service: AppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppService],
    }).compile();

    service = module.get<AppService>(AppService);
  });

  it("sould be defined", () => {
    expect(service).toBeDefined();
  });

  describe("getHome()", () => {
    describe("when called", () => {
      it("should return 'Nidus API'", () => {
        const result = service.getHome();
        expect(result).toEqual("Nidus API");
      });
    });
  });

  describe("getVersion()", () => {
    describe("when called", () => {
      // Mocke function
      it("should return '1.0.0'", () => {
        const result = service.getVersion();
        expect(result).toEqual("1.0.0");
      });
    });
  });
});
