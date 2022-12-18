import { Test, TestingModule } from "@nestjs/testing";
import { CreateUserDto } from "../dto/create-user.dto";
import { UpdateUserDto } from "../dto/update-user.dto";
import { UserService } from "../providers/user.service";
import { UserController } from "./user.controller";

const testUser = "mail@alexandrelamberty.com";

describe("UserController Unit Tests", () => {
  let controller: UserController;
  let service: UserService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            getAll: jest
              .fn()
              .mockResolvedValue([
                { email: testUser },
                { email: "mail@krisbrown.com" },
                { email: "mail@zoetaylor.com" },
              ]),
            getById: jest.fn().mockImplementation((id: string) =>
              Promise.resolve({
                _id: id,
                name: testUser,
              })
            ),
            getByName: jest
              .fn()
              .mockImplementation((name: string) => Promise.resolve({ name })),
            insert: jest
              .fn()
              .mockImplementation((user: CreateUserDto) =>
                Promise.resolve({ ...user })
              ),
            update: jest
              .fn()
              .mockImplementation((id: string, user: UpdateUserDto) =>
                Promise.resolve({ _id: id, ...user })
              ),
            delete: jest.fn().mockResolvedValue({ deleted: true }),
          },
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  it("sould be defined", () => {
    expect(controller).toBeDefined();
  });

  describe("getAll", () => {
    it("should get an array of plants", () => {
      expect(controller.getAll({})).resolves.toEqual([
        {
          email: testUser,
        },
        {
          email: "mail@krisbrown.com",
        },
        {
          email: "mail@zoetaylor.com",
        },
      ]);
    });
  });

  // describe("getById", () => {
  //   it("should get a single User", () => {
  //     expect(controller.getById("a strange id")).resolves.toEqual({
  //       _id: "a strange id",
  //       email: testUser,
  //     });

  //     expect(controller.getById("a different id")).resolves.toEqual({
  //       _id: "a different id",
  //       email: testUser,
  //     });
  //   });
  // });

  // describe("insert", () => {
  //   it("should create a new User", () => {
  //     const dto: CreateUserDto = {
  //       email: "mail@briangreen.com",
  //       password: "123",
  //       confirmPassword: "123",
  //     };

  //     expect(controller.insert(dto)).resolves.toEqual({
  //       _id: "a uuid",
  //       ...dto,
  //     });
  //   });
  // });

  // describe("update", () => {
  //   it("should update a User", () => {
  //     const id = "638e04dab2bcf419a0c362c1";
  //     const dto: UpdateUserDto = {
  //       email: "email@mail.com",
  //     };

  //     expect(controller.update(id, dto)).resolves.toEqual({
  //       _id: id,
  //       ...dto,
  //     });
  //   });
  // });

  // describe("delete", () => {
  //   it("should return that it deleted a User", () => {
  //     expect(controller.delete("638e04dab2bcf419a0c362c1")).resolves.toEqual({
  //       deleted: true,
  //     });
  //   });
  //   it("should return that it did not delete a User", () => {
  //     const deleteSpy = jest
  //       .spyOn(service, "delete")
  //       .mockResolvedValueOnce({ deleted: false });

  //     expect(controller.delete("123")).resolves.toEqual({
  //       deleted: false,
  //     });
  //     expect(deleteSpy).toBeCalledWith("123");
  //   });
  // });
});
