import { createMock } from "@golevelup/ts-jest";
import { getModelToken } from "@nestjs/mongoose";
import { Test, TestingModule } from "@nestjs/testing";
import { Model, Query } from "mongoose";
import { User } from "../interface/user.interface";
import { UserDocument } from "../schemas/user.schema";
import { UserService } from "./user.service";

const mockUser = (
  _id = "638e04dab2bcf419a0c362c1",
  email = "mail@alexandrelamberty.com"
): User => ({
  _id,
  email,
});

const mockUserDoc = (mock?: Partial<User>): Partial<UserDocument> => ({
  _id: mock?._id || "638e04dab2bcf419a0c362c1",
  email: mock?.email || "mail@alexandrelamberty.com",
});

const plantArray = [
  mockUser(),
  mockUser("635e04dab2bcf419a0c362c1", "mail@krissbrown.com"),
  mockUser("637e04dab2bcf419a0c362c2", "mail@zoetaylor.com"),
];

const userDocArray = [
  mockUserDoc(),
  mockUserDoc({
    _id: "635e04dab2bcf419a0c362c1",
    email: "mail@krissbrown.com",
  }),
  mockUserDoc({
    _id: "637e04dab2bcf419a0c362c2",
    email: "mail@zoetaylor.com",
  }),
];

describe("UserService", () => {
  let service: UserService;
  let model: Model<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getModelToken("User"),
          // notice that only the functions we call from the model are mocked
          useValue: {
            new: jest.fn().mockResolvedValue(mockUser()),
            constructor: jest.fn().mockResolvedValue(mockUser()),
            // FIXME: Mock implemention for skip() and value ?
            find: jest.fn(),
            findById: jest.fn(),
            findByIdAndDelete: jest.fn(),
            findByIdAndUpdate: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            create: jest.fn(),
            remove: jest.fn(),
            sort: jest.fn(),
            skip: jest.fn(),
            exec: jest.fn(),
            count: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    model = module.get<Model<User>>(getModelToken("User"));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("sould be defined", () => {
    expect(service).toBeDefined();
  });

  describe("getAll", () => {
    it("should return all users", async () => {
      jest.spyOn(model, "find").mockReturnValue({
        skip: jest.fn(),
        count: 3,
        users: jest.fn().mockResolvedValueOnce(userDocArray),
      } as any);

      const plants = await service.getAll();
      expect(plants).toEqual(plantArray);
    });
  });

  // describe("findById", () => {
  //   it("should getOne by id", async () => {
  //     jest.spyOn(model, "findOne").mockReturnValueOnce(
  //       createMock<Query<UserDocument, UserDocument>>({
  //         exec: jest.fn().mockResolvedValueOnce(
  //           mockUserDoc({
  //             _id: "123",
  //             email: "mail@mail.com",
  //           })
  //         ),
  //       }) as any
  //     );

  //     const findMockPlant = mockUser("123", "mail@mail.com");
  //     const foundPlant = await service.findById("123");
  //     expect(foundPlant).toEqual(findMockPlant);
  //   });
  // });

  // describe("insert", () => {
  //   it("should insert a new user", async () => {
  //     jest.spyOn(model, "create").mockImplementationOnce(() =>
  //       Promise.resolve({
  //         _id: "123",
  //         email: "john.smith@google.com",
  //       })
  //     );
  //     const newPlant = await service.insert({
  //       email: "john.smith@google.com",
  //       password: "123",
  //       confirmPassword: "123",
  //     });
  //     expect(newPlant).toEqual(mockUser("123", "john.smith@google.com"));
  //   });
  // });

  // describe("update", () => {
  //   // jest is complaining about findOneAndUpdate. Can't say why at the moment.
  //   it.skip("should update a user successfully", async () => {
  //     jest.spyOn(model, "findOneAndUpdate").mockReturnValueOnce(
  //       createMock<Query<UserDocument, UserDocument>>({
  //         exec: jest.fn().mockResolvedValueOnce({
  //           _id: "444",
  //           email: "mail@mail.com",
  //         }),
  //       }) as any
  //     );
  //     const updatedCat = await service.update("444", {
  //       email: "mail@mail.org",
  //     });
  //     expect(updatedCat).toEqual(mockUser("444", "mail@mail.org"));
  //   });
  // });

  // describe("delete", () => {
  //   it("should delete a user successfully", async () => {
  //     // really just returning a truthy value here as we aren't doing any logic with the return
  //     jest.spyOn(model, "findByIdAndDelete").mockResolvedValueOnce(true as any);
  //     expect(await service.delete("a bad id")).toEqual({ deleted: true });
  //   });
  //   it("should not delete a user", async () => {
  //     // really just returning a falsy value here as we aren't doing any logic with the return
  //     jest
  //       .spyOn(model, "findByIdAndDelete")
  //       .mockRejectedValueOnce(new Error("Bad delete"));
  //     expect(await service.delete("a bad id")).toEqual({
  //       deleted: false,
  //       message: "Bad delete",
  //     });
  //   });
  // });
});
