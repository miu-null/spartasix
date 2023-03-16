import { Test, TestingModule } from '@nestjs/testing';
import { ClubcommentController } from './clubcomment.controller';

describe('ClubcommentController', () => {
  let controller: ClubcommentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClubcommentController],
    }).compile();

    controller = module.get<ClubcommentController>(ClubcommentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
