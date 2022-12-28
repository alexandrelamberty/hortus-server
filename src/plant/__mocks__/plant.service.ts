import { plantStub } from "@plant/test/stubs/plant.stub";

export const PlantService = jest.fn().mockReturnValue({
  getAll: jest.fn().mockResolvedValue([plantStub()]),
  getById: jest.fn().mockResolvedValue(plantStub()),
  insert: jest.fn().mockResolvedValue(plantStub()),
  update: jest.fn().mockResolvedValue(plantStub()),
});

/*
getAll: jest.fn().mockResolvedValue([
              { name: testPlant1, family: testFamily1, genus: "D. carota" },
              {
                name: "Test Plant 2",
                family: "Test Family 2",
                genus: "",
              },
              { name: "Test Plant 3", family: "Test Family 3", genus: "" },
            ]),
            getById: jest.fn().mockImplementation((id: string) =>
              Promise.resolve({
                name: testPlant1,
                family: testFamily1,
                genus: "D. carota",
                _id: id,
              })
            ),
            insert: jest
              .fn()
              .mockImplementation((plant: CreatePlantDto) =>
                Promise.resolve({ _id: "a uuid", ...plant })
              ),
            update: jest
              .fn()
              .mockImplementation((plant: UpdatePlantDto) =>
                Promise.resolve({ _id: "a uuid", ...plant })
              ),
            delete: jest.fn().mockResolvedValue({ deleted: true }),*/
