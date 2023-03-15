import { Body, Controller, Delete, Get, Param, Patch, Post, Req } from "@nestjs/common";
import { CreateCommentDto } from "./dto/createcomment.dto";
import { EventCommentService } from "./eventcomment.service";

@Controller("eventcomment")
export class EventCommentController {
  constructor(private eventCommentService: EventCommentService) {}

  @Get("/comments")
  async showAllComment() {
    const comments = await this.eventCommentService.showAllComment();

    return comments;
  }

  @Post("/create-comment/:id")
  async createComment(
    @Param("id") eventPostId: number,
    @Body() data: CreateCommentDto,
    @Req() req,
  ) {
    const userId = req.user;
    this.eventCommentService.createComment(userId, eventPostId, data.content);

    return true;
  }

  @Patch("/update-comment/:id")
  async updateComment(
    @Param("id") eventCommentId: number,
    @Body() data: CreateCommentDto,
    @Req() req,
  ) {
    const userId = req.user;
    await this.eventCommentService.updateComment(userId, eventCommentId, data.content);

    return true;
  }

  @Delete("/delete-comment/:id")
  async deleteComment(
    @Param("id") eventCommentId: number,
    @Req() req,
  ) {
    const userId = req.user;
    await this.eventCommentService.deleteComment(userId, eventCommentId);

    return true;
  }
}
