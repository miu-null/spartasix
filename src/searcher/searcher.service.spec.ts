import { Test, TestingModule } from '@nestjs/testing';
import { SearcherService } from './searcher.service';

describe('SearcherService', () => {
  let service: SearcherService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SearcherService],
    }).compile();

    service = module.get<SearcherService>(SearcherService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
