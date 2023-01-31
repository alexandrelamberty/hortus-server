import { Test, TestingModule } from "@nestjs/testing";
import { UsersModule } from "../users/users.module";
import { UsersService } from "../users/users.service";
import { AuthController } from "./auth.controller";
import { AuthModule } from "./auth.module";
import { AuthService } from "./auth.service";

describe("AuthController", () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AuthModule, UsersModule],
      controllers: [AuthController],
      providers: [AuthService, UsersService],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
