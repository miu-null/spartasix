import { Controller } from "@nestjs/common";
import { ClubCommentService } from "./clubcomment.service";

@Controller("clubComment")
export class ClubCommentController {
  constructor(private readonly clubCommentService: ClubCommentService) {}
}
