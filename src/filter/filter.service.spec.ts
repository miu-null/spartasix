import { Test, TestingModule } from '@nestjs/testing';
import { FilterService } from './filter.service';
import { FilterRepository } from './filter.repository';

describe('filterService', () => {
  let service: FilterService;
  let repository: FilterRepository;

  const searchData = {
    events: [{ id: 1, title: 'Event 1' }, { id: 2, title: 'Event 2' }],
    clubs: [{ id: 1, title: 'Club 1' }, { id: 2, title: 'Club 2' }],
    users: [{ id: 1, name: 'User 1' }, { id: 2, name: 'User 2' }]
  };

  const mockFilterRepository = {
    findAllPosts: jest.fn().mockResolvedValue(searchData)
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        filterService,
        {
          provide: FilterRepository,
          useValue: mockFilterRepository
        }
      ],
    }).compile();

    service = module.get<filterService>(filterService);
    repository = module.get<FilterRepository>(FilterRepository);
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
