import { Test, TestingModule } from '@nestjs/testing';
import { LocalisationService } from './localisation.service';

describe('LocalisationService', () => {
  let service: LocalisationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LocalisationService],
    }).compile();

    service = module.get<LocalisationService>(LocalisationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
