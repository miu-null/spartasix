import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EventComments } from "src/entities/eventcomments.entity";
import { Repository } from "typeorm";

@Injectable()
export class EventCommentRepository {
  constructor(
    @InjectRepository(EventComments)
    private readonly eventRepository: Repository<EventComments>,
  ) {}

  async showAllComment() {
    const comments = await this.eventRepository.find({
      where: { deletedAt: null },
      select: ["userId", "eventPostId", "content", "createdAt"],
    });

    return comments;
  }

  async createComment(userId: number, eventPostId: number, content: string) {
    this.eventRepository.insert({
      userId,
      eventPostId,
      content,
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
      where: { eventCommentId, deletedAt: null },
      select: ["userId", "eventPostId", "content"],
    });

    return comment
  }
}
