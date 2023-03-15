import { Body, Controller, Post } from "@nestjs/common";
import { CreateCommentDto } from "./dto/createcomment.dto";
import { EventCommentService } from "./eventcomment.service";

@Controller("/eventcomment")
export class EventCommentController {
  constructor(private eventCommentService: EventCommentService) {}

  @Post("/create-comment")
  async createComment(@Body() data: CreateCommentDto) {
    this.eventCommentService.createComment(data.content);

    return true;
  }
}
