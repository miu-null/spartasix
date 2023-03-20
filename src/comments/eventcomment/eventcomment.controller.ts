import { Body, Controller, Delete, Get, Param, Patch, Post, Req, Res } from "@nestjs/common";
import { CreateCommentDto } from "../dto/createcomment.dto";
import { EventCommentService } from "./eventcomment.service";

@Controller("eventcomment")
export class EventCommentController {
  constructor(private eventCommentService: EventCommentService) {}

  @Get("/:id/comments")
  async showAllComment(@Param("id") eventPostId: number) {

    const comments = await this.eventCommentService.showAllComment(eventPostId);

    return comments
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

  @Get("/show_comment_like")
  async showLike() {

    const like = await this.eventCommentService.showLike();
    return like
  }

  @Post("/update_event_like/:commentId")
  async updateLike(
    @Req() req, 
    @Param("commentId") commentId: number,
    ) {
    const userId = req.user;

    await this.eventCommentService.updateLike(userId, commentId)

    return true;
  }
}
