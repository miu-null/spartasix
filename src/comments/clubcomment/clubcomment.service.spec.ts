import { Test, TestingModule } from '@nestjs/testing';
import { ClubcommentService } from './clubcomment.service';

describe('ClubcommentService', () => {
  let service: ClubcommentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClubcommentService],
    }).compile();

    service = module.get<ClubcommentService>(ClubcommentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
