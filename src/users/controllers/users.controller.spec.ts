import { TestingModule, Test } from "@nestjs/testing";
import { UsersController } from "./users.controller";
import { UsersService } from "../providers/users.service";

describe("UserController Unit Tests", () => {
  let controller: UsersController;
  let service: UsersService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],

      providers: [
        {
          provide: UsersService,
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  it("sould be defined", () => {
    expect(controller).toBeDefined();
  });
});
