import { Test, TestingModule } from "@nestjs/testing";
import { ClubCommentController } from "./clubcomment.controller";

describe("ClubcommentController", () => {
  let controller: ClubCommentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClubCommentController],
    }).compile();

    controller = module.get<ClubCommentController>(ClubCommentController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
