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
    const comment = await this.eventRepository.find({
      where: { eventPostId, deletedAt: null },
      relations: {
        user: true,
        eventCommentLikes: true,
      },
      select: {
        user: {
          id: true,
          nickName: true,
        },
        eventCommentLikes: {
          id: true,
        },
        id: true,
        eventPostId: true,
        content: true,
        createdAt: true,
      },
    });

    return comment;
  }

  async createComment(userId: number, eventPostId: number, content: string) {
    this.eventRepository.insert({
      userId,
      eventPostId,
      content,
      class: 0,
    });
  }

  async updateComment(userId: number, id: number, content: string) {
    const comment = await this.findCommentUserId(id);

    if (!comment) {
      throw new BadRequestException("댓글이 존재하지 않습니다.");
    }

    if (userId !== comment.userId) {
      throw new BadRequestException("작성자만 사용할 수 있는 기능입니다.");
    }

    const updateComment = await this.eventRepository.update(id, {
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
      throw new BadRequestException("작성자만 사용할 수 있는 기능입니다.");
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

  async updateLike(userId: number, commentId: number) {
    console.log(userId, commentId);
    const Like = await this.eventCommentLikeRepository.findOne({
      where: { userId, eventCommentId: commentId, deletedAt: null },
      select: ["id"],
    });

    if (Like) {
      await this.eventCommentLikeRepository.softDelete(Like.id);

      throw new BadRequestException();
    }

    if (!Like) {
      await this.eventCommentLikeRepository.insert({
        userId,
        eventCommentId: commentId,
      });

      return true;
    }
  }
}
