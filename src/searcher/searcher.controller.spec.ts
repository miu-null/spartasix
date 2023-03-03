import { Test, TestingModule } from '@nestjs/testing';
import { SearcherController } from './searcher.controller';

describe('SearcherController', () => {
  let controller: SearcherController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SearcherController],
    }).compile();

    controller = module.get<SearcherController>(SearcherController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
