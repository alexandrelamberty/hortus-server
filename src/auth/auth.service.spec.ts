import { Test, TestingModule } from "@nestjs/testing";
import { UsersModule } from "../users/users.module";
import { UsersService } from "../users/users.service";
import { AuthModule } from "./auth.module";
import { AuthService } from "./auth.service";

describe("AuthService", () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AuthModule, UsersModule],
      providers: [AuthService, UsersService],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
