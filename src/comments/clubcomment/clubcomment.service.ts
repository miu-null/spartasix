import { Injectable } from "@nestjs/common";
import { ClubCommentRepository } from "./clubcomment.repository";

@Injectable()
export class ClubCommentService {
  constructor(private readonly clubCommentRepository: ClubCommentRepository) {}
}
