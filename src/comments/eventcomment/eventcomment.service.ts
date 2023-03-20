import { Injectable } from "@nestjs/common";
import { EventCommentRepository } from "./eventcomment.repository";

@Injectable()
export class EventCommentService {
  constructor(
    private readonly eventCommentRepository: EventCommentRepository,
  ) {}

  async showAllComment(eventPostId: number) {
    const comments = await this.eventCommentRepository.showAllComment(eventPostId);

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

  async showLike() {
    const like = await this.eventCommentRepository.showLike();

    return like
  }

  async updateLike(userId: number, commentId: number) {
    await this.eventCommentRepository.updateLike(userId, commentId);

    return true;
  }
}
