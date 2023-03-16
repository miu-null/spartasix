import { Test, TestingModule } from '@nestjs/testing';
import { EventcommentController } from './eventcomment.controller';

describe('EventcommentController', () => {
  let controller: EventcommentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventcommentController],
    }).compile();

    controller = module.get<EventcommentController>(EventcommentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
