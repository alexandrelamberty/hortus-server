import { Test, TestingModule } from "@nestjs/testing";
import { AppService } from "./app.service";

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

  it("should return home text", async () => {
    const result = service.getHome();
    expect(result).toEqual("Nidus API");
  });

  it("should return version text", async () => {
    const result = service.getVersion();
    expect(result).toEqual("1.0.0");
  });
});
