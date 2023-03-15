import { Injectable } from "@nestjs/common";
import { EventCommentRepository } from "./eventcomment.repository";

@Injectable()
export class EventCommentService {
  constructor(
    private readonly eventCommentRepository: EventCommentRepository,
  ) {}

  async createComment(data: string) {}
}
