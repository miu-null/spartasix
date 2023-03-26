import { Test, TestingModule } from "@nestjs/testing";
import { ClubCommentService } from "./clubcomment.service";

describe("ClubcommentService", () => {
  let service: ClubCommentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClubCommentService],
    }).compile();

    service = module.get<ClubCommentService>(ClubCommentService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
