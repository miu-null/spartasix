interface PaginatedResult {
  data: any[];
  count: number;
  totalPages: number;
  slicedData: any[];
  searchCount: any;
  lastPage: number;
  unitStart: number;
  unitEnd: number;
}

import { Test, TestingModule } from '@nestjs/testing';
import { SearcherController } from './searcher.controller';
import { SearcherService } from './searcher.service';

jest.mock('./searcher.service');

describe('SearcherController', () => {
  let controller: SearcherController;
  let service: SearcherService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SearcherController],
      providers: [SearcherService],
    }).compile();

    controller = module.get<SearcherController>(SearcherController);
    service = module.get<SearcherService>(SearcherService);
  });

  describe('searchAllPosts', () => {
    it('should return search results', async () => {
      const result = {
        term: 'test',
        events: [],
        clubs: [],
        users: [],
        reformPostDate: jest.fn(),
      };
      const popularPosts = [];
      jest.spyOn(service, 'findAllPosts').mockResolvedValueOnce(result);
      jest.spyOn(service, 'getPopularPosts').mockResolvedValueOnce(popularPosts);
      const res = {
        render: jest.fn(),
      };
      const req = {
        user: null,
      };
      await controller.searchAllPosts(1, { term: 'test' }, res as any, req as any);
      expect(service.findAllPosts).toHaveBeenCalledWith('test');
      expect(service.getPopularPosts).toHaveBeenCalled();
      expect(res.render).toHaveBeenCalledWith('searchAll.ejs', {
        ...result,
        ...popularPosts,
        popularPosts,
        buttonUserId: null,
      });
    });
  });

  describe('searchUsers', () => {
    it('should return user search results', async () => {
      const userData: PaginatedResult = {
        slicedData: [],
        searchCount: 0,
        lastPage: 0,
        unitStart: 0,
        unitEnd: 0,
        totalPages: 0,
        count: 0, 
        data: [], 
      };
      jest.spyOn(service, 'paginatedResults').mockResolvedValueOnce(userData);
      const result = await controller.searchUsers(1, { term: 'test' }, { user: null } as any);
      expect(service.paginatedResults).toHaveBeenCalledWith('users', 1, 'test');
      expect(result).toEqual({
        term: 'test',
        page: 1,
        ...userData,
        reformPostDate: expect.any(Function),
        buttonUserId: null

      });
    });
  });
});
