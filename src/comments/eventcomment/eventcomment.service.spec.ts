import { Test, TestingModule } from "@nestjs/testing";
import { EventCommentService } from "./eventcomment.service";

describe("EventcommentService", () => {
  let service: EventCommentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EventCommentService],
    }).compile();

    service = module.get<EventCommentService>(EventCommentService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
