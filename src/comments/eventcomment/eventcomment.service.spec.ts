import { Test, TestingModule } from '@nestjs/testing';
import { EventcommentService } from './eventcomment.service';

describe('EventcommentService', () => {
  let service: EventcommentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EventcommentService],
    }).compile();

    service = module.get<EventcommentService>(EventcommentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
