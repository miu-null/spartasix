import { Injectable } from "@nestjs/common";
import { ClubCommentRepository } from "./clubcomment.repository";

@Injectable()
export class ClubCommentService {
  constructor(private readonly clubCommentRepository: ClubCommentRepository) {}

  async showAllComment() {
    const comments = await this.clubCommentRepository.showAllComment();

    return comments;
  }

  async createComment(userId: number, clubId: number, content: string) {
    this.clubCommentRepository.createComment(userId, clubId, content);
  }

  async updateComment(userId: number, clubCommentId: number, content: string) {
    await this.clubCommentRepository.updateComment(
      userId,
      clubCommentId,
      content,
    );

    return true;
  }

  async deleteComment(userId: number, clubCommentId: number) {
    await this.clubCommentRepository.deleteComment(userId, clubCommentId);

    return true;
  }
}
