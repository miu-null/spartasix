import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { CreateCommentDto } from "../dto/createcomment.dto";
import { ClubCommentService } from "./clubcomment.service";

@Controller("clubcomment")
export class ClubCommentController {
  constructor(private readonly clubCommentService: ClubCommentService) {}

  @Post("/create-comment/:id")
  @UseGuards(AuthGuard())
  async createComment(
    @Param("id") clubId: number,
    @Body() data: CreateCommentDto,
    @Req() req,
  ) {
    const userId = req.user;
    console.log(userId)
    this.clubCommentService.createComment(userId, clubId, data.content);

    return true;
  }

  @Patch("/update-comment/:id")
  @UseGuards(AuthGuard())
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
  @UseGuards(AuthGuard())
  async deleteComment(@Param("id") clubCommentId: number, @Req() req) {
    const userId = req.user;
    await this.clubCommentService.deleteComment(userId, clubCommentId);

    return true;
  }

  @Post("/update_club_like/:commentId")
  @UseGuards(AuthGuard())
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
