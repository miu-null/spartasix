import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EventCommentLikes } from "src/entities/eventcommentlikes.entity";
import { EventComments } from "src/entities/eventcomments.entity";
import { Users } from "src/entities/users.entity";
import { Repository } from "typeorm";

@Injectable()
export class EventCommentRepository {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
    @InjectRepository(EventComments)
    private readonly eventRepository: Repository<EventComments>,
    @InjectRepository(EventCommentLikes)
    private readonly eventCommentLikeRepository: Repository<EventCommentLikes>,
  ) {}

  async showAllComment(eventPostId: number) {
    const comments = await this.eventRepository.find({
      where: { id: eventPostId, deletedAt: null },
      select: [
        "id",
        "userId",
        "eventPostId",
        "content",
        "createdAt",
      ],
    });


    return { comments };
  }

  async createComment(userId: number, eventPostId: number, content: string) {
    this.eventRepository.insert({
      userId,
      eventPostId,
      content,
      class: 0,
    });
  }

  async updateComment(userId: number, eventCommentId: number, content: string) {
    const comment = await this.findCommentUserId(eventCommentId);

    if (!comment) {
      throw new BadRequestException("댓글이 존재하지 않습니다.");
    }

    if (userId !== comment.userId) {
      throw new UnauthorizedException("작성자만 사용할 수 있는 기능입니다.");
    }

    const updateComment = await this.eventRepository.update(eventCommentId, {
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

    await this.eventRepository.softDelete(eventCommentId);
  }

  async findCommentUserId(eventCommentId: number) {
    const comment = await this.eventRepository.findOne({
      where: { id: eventCommentId, deletedAt: null },
      select: ["userId", "eventPostId", "content"],
    });

    return comment;
  }

  async showLike() {
    const like = await this.eventCommentLikeRepository.find({
      where: { deletedAt: null },
    });
    return like;
  }

  async updateLike(userId: number, commentId: number) {
    const Like = await this.eventCommentLikeRepository.findOne({
      where: { id: userId, eventCommentId: commentId, deletedAt: null },
      select: ["id"],
    });

    if (Like) {
      await this.eventCommentLikeRepository.softDelete(Like.id);
    }

    if (!Like) {
      await this.eventCommentLikeRepository.insert({
        userId,
        eventCommentId: commentId,
      });
    }

    return true;
  }
}
