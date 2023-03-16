import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ClubComments } from "src/entities/clubcomments.entity";
import { Repository } from "typeorm";

@Injectable()
export class ClubCommentRepository {
  constructor(
    @InjectRepository(ClubComments)
    private readonly clubRepository: Repository<ClubComments>,
  ) {}

  async showAllComment() {
    const comments = await this.clubRepository.find({
      where: { deletedAt: null },
      select: ["userId", "clubId", "content", "createdAt"],
    });

    return comments;
  }

  async createComment(userId: number, clubId: number, content: string) {
    console.log("userId : "+userId)
    this.clubRepository.insert({
      userId,
      clubId,
      content,
    });
  }

  async updateComment(userId: number, clubCommentId: number, content: string) {
    const comment = await this.findCommentUserId(clubCommentId);

    if (!comment) {
      throw new BadRequestException("댓글이 존재하지 않습니다.");
    }

    if (userId !== comment.userId) {
      throw new UnauthorizedException("작성자만 사용할 수 있는 기능입니다.");
    }

    const updateComment = await this.clubRepository.update(clubCommentId, {
      content,
    });

    return updateComment;
  }

  async deleteComment(userId: number, eventCommentId: number) {
    const comment = await this.findCommentUserId(eventCommentId);

    if (!comment) {
      throw new BadRequestException("댓글이 존재하지 않습니다.");
    }

    if (userId !== comment.userId) {
      throw new UnauthorizedException("작성자만 사용할 수 있는 기능입니다.");
    }

    await this.clubRepository.softDelete(eventCommentId);
  }

  async findCommentUserId(clubCommentId: number) {
    const comment = await this.clubRepository.findOne({
      where: { clubCommentId, deletedAt: null },
      select: ["userId", "clubCommentId", "content"],
    });

    return comment;
  }
}
