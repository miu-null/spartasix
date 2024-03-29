import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { FilterRepository } from './filter.repository';
import { Clubs } from '../entities/clubs.entity';
import { EventPosts } from '../entities/events.entity';
import { Users } from '../entities/users.entity';

describe('filterRepository', () => {
  let filterRepository: FilterRepository;
  let clubRepository: any;
  let eventRepository: any;
  let userSearchRepository: any;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        FilterRepository,
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

    filterRepository = moduleRef.get<FilterRepository>(FilterRepository);
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

      jest.spyOn(filterRepository, 'findClubPosts').mockResolvedValue(clubResult);
      jest.spyOn(filterRepository, 'findEventPosts').mockResolvedValue(eventResult);
      jest.spyOn(filterRepository, 'findUsers').mockResolvedValue(userResult);

      const results = await filterRepository.findAllPosts({ term });

      expect(results).toEqual({ clubs: clubResult, events: eventResult, users: userResult });
    });
  });
});
