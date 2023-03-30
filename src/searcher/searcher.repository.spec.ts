import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { SearcherRepository } from './searcher.repository';
import { Clubs } from '../entities/clubs.entity';
import { EventPosts } from '../entities/events.entity';
import { Users } from '../entities/users.entity';

describe('SearcherRepository', () => {
  let searcherRepository: SearcherRepository;
  let clubRepository: any;
  let eventRepository: any;
  let userSearchRepository: any;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        SearcherRepository,
        {
          provide: getRepositoryToken(Users),
          useValue: {
            createQueryBuilder: jest.fn(),
            find: jest.fn(),
            findOne: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(Clubs),
          useValue: {
            createQueryBuilder: jest.fn(),
            find: jest.fn(),
            findOne: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(EventPosts),
          useValue: {
            createQueryBuilder: jest.fn(),
            find: jest.fn(),
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    searcherRepository = moduleRef.get<SearcherRepository>(SearcherRepository);
    clubRepository = moduleRef.get(getRepositoryToken(Clubs));
    eventRepository = moduleRef.get(getRepositoryToken(EventPosts));
    userSearchRepository = moduleRef.get(getRepositoryToken(Users));
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('findAllPosts', () => {
    it('should return an object containing arrays of clubs, events, and users', async () => {
      const term = 'test';
      const clubResult = [new Clubs()];
      const eventResult = [new EventPosts()];
      const userResult = [new Users()];

      jest.spyOn(searcherRepository, 'findClubPosts').mockResolvedValue(clubResult);
      jest.spyOn(searcherRepository, 'findEventPosts').mockResolvedValue(eventResult);
      jest.spyOn(searcherRepository, 'findUsers').mockResolvedValue(userResult);

      const results = await searcherRepository.findAllPosts({ term });

      expect(results).toEqual({ clubs: clubResult, events: eventResult, users: userResult });
    });
  });
});
