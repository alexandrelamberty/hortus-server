import { seedStub } from "../__tests__/stubs/seed.stub";

export const SeedsController = jest.fn().mockReturnValue({
  getAllSeeds: jest.fn().mockResolvedValue([seedStub()]),
  getSeedById: jest.fn().mockResolvedValue(seedStub()),
  createSeed: jest.fn().mockResolvedValue(seedStub()),
  updateSeed: jest.fn().mockResolvedValue(seedStub()),
  deleteSeed: jest.fn().mockResolvedValue(seedStub()),
});
