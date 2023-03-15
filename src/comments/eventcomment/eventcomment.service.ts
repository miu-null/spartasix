import { Injectable } from "@nestjs/common";
import { EventCommentRepository } from "./eventcomment.repository";

@Injectable()
export class EventCommentService {
  constructor(
    private readonly eventCommentRepository: EventCommentRepository,
  ) {}

  async showAllComment() {
    const comments = await this.eventCommentRepository.showAllComment();

    return comments;
  }

  async createComment(userId: number, eventPostId: number, content: string) {
    this.eventCommentRepository.createComment(userId, eventPostId, content);
  }

  async updateComment(userId: number, eventCommentId: number, content: string) {
    await this.eventCommentRepository.updateComment(userId, eventCommentId, content);

    return true;
  }

  async deleteComment(userId: number, eventCommentId: number) {
    await this.eventCommentRepository.deleteComment(userId, eventCommentId);

    return true;
  }
}
