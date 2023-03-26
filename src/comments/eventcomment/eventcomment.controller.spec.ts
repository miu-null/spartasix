import { Test, TestingModule } from "@nestjs/testing";
import { EventCommentController } from "./eventcomment.controller";

describe("EventcommentController", () => {
  let controller: EventCommentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventCommentController],
    }).compile();

    controller = module.get<EventCommentController>(EventCommentController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
