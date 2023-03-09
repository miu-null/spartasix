import { Test, TestingModule } from '@nestjs/testing';
import { UserpageService } from './userpage.service';

describe('UserpageService', () => {
  let service: UserpageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserpageService],
    }).compile();

    service = module.get<UserpageService>(UserpageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
