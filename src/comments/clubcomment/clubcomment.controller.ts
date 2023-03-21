import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
} from "@nestjs/common";
import { CreateCommentDto } from "../dto/createcomment.dto";
import { ClubCommentService } from "./clubcomment.service";

@Controller("clubcomment")
export class ClubCommentController {
  constructor(private readonly clubCommentService: ClubCommentService) {}

  @Get("/:id/comments")
  async showAllComment(@Param("id") clubPostId: number) {
    const comments = await this.clubCommentService.showAllComment(clubPostId);

    return comments;
  }

  @Post("/create-comment/:id")
  async createComment(
    @Param("id") clubId: number,
    @Body() data: CreateCommentDto,
    @Req() req,
  ) {
    const userId = req.user;

    this.clubCommentService.createComment(userId, clubId, data.content);

    return true;
  }

  @Patch("/update-comment/:id")
  async updateComment(
    @Param("id") clubCommentId: number,
    @Body() data: CreateCommentDto,
    @Req() req,
  ) {
    const userId = req.user;
    await this.clubCommentService.updateComment(
      userId,
      clubCommentId,
      data.content,
    );

    return true;
  }

  @Delete("/delete-comment/:id")
  async deleteComment(@Param("id") clubCommentId: number, @Req() req) {
    const userId = req.user;
    await this.clubCommentService.deleteComment(userId, clubCommentId);

    return true;
  }

  @Post("/update_club_like/:commentId")
  async updateLike(
    @Req() req, 
    @Param("commentId") commentId: number,
    ) {
      console.log("hello")
      console.log(commentId)
    const userId = req.user;

    await this.clubCommentService.updateLike(userId, commentId)

    return true;
  }
}
