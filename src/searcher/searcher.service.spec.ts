import { Test, TestingModule } from '@nestjs/testing';
import { SearcherService } from './searcher.service';
import { SearcherRepository } from './searcher.repository';

describe('SearcherService', () => {
  let service: SearcherService;
  let repository: SearcherRepository;

  const searchData = {
    events: [{ id: 1, title: 'Event 1' }, { id: 2, title: 'Event 2' }],
    clubs: [{ id: 1, title: 'Club 1' }, { id: 2, title: 'Club 2' }],
    users: [{ id: 1, name: 'User 1' }, { id: 2, name: 'User 2' }]
  };

  const mockSearcherRepository = {
    findAllPosts: jest.fn().mockResolvedValue(searchData)
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SearcherService,
        {
          provide: SearcherRepository,
          useValue: mockSearcherRepository
        }
      ],
    }).compile();

    service = module.get<SearcherService>(SearcherService);
    repository = module.get<SearcherRepository>(SearcherRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAllPosts', () => {
    it('should return search results', async () => {
      const result = await service.findAllPosts('test');
      expect(repository.findAllPosts).toHaveBeenCalledWith('test');
      expect(result).toEqual(searchData);
    });
  });
});
