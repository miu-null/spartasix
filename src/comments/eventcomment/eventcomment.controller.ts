import { Body, Controller, Delete, Get, Param, Patch, Post, Req, Res, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { CreateCommentDto } from "../dto/createcomment.dto";
import { EventCommentService } from "./eventcomment.service";

@Controller("eventcomment")
export class EventCommentController {
  constructor(private eventCommentService: EventCommentService) {}

  @Post("/create-comment/:id")
  @UseGuards(AuthGuard())
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
  @UseGuards(AuthGuard())
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
  @UseGuards(AuthGuard())
  async deleteComment(
    @Param("id") eventCommentId: number,
    @Req() req,
  ) {
    const userId = req.user;
    await this.eventCommentService.deleteComment(userId, eventCommentId);

    return true;
  }

  @Post("/update_event_like/:commentId")
  @UseGuards(AuthGuard())
  async updateLike(
    @Req() req, 
    @Param("commentId") commentId: number,
    ) {
    const userId = req.user;

    await this.eventCommentService.updateLike(userId, commentId)

    return true;
  }
}
