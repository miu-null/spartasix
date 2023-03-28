import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ClubCommentLikes } from "src/entities/clubcommentlikes.entity";
import { ClubComments } from "src/entities/clubcomments.entity";
import { Repository } from "typeorm";

@Injectable()
export class ClubCommentRepository {
  constructor(
    @InjectRepository(ClubComments)
    private readonly clubRepository: Repository<ClubComments>,
    @InjectRepository(ClubCommentLikes)
    private readonly clubCommentLikeRepository: Repository<ClubCommentLikes>,
  ) {}

  async showAllComment(clubPostId: number) {
    const comments = await this.clubRepository.find({
      where: { clubId: clubPostId, deletedAt: null },
      relations: {
        user: true,
        clubCommentLikes: true,
      },
      select: {
        user: {
          id: true,
          nickName: true,
        },
        clubCommentLikes: {
          id: true,
        },
        id: true,
        userId: true,
        clubId: true,
        content: true,
        createdAt: true,
      },
    });

    return comments;
  }

  async createComment(userId: number, clubId: number, content: string) {
    this.clubRepository.insert({
      userId,
      clubId,
      content,
      class: 0,
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
      where: { id: clubCommentId, deletedAt: null },
      select: ["userId", "clubId", "content"],
    });

    return comment;
  }

  async updateLike(userId: number, commentId: number) {
    const Like = await this.clubCommentLikeRepository.findOne({
      where: { userId, clubCommentId: commentId, deletedAt: null },
      select: ["id"],
    });

    if (Like) {
      await this.clubCommentLikeRepository.softDelete(Like.id);

      throw new BadRequestException("좋아요 취소");
    }

    if (!Like) {
      await this.clubCommentLikeRepository.insert({
        userId,
        clubCommentId: commentId,
      });

      return true;
    }
  }
}
