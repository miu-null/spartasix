import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ClubComments } from "src/entities/clubcomments.entity";
import { Repository } from "typeorm";

@Injectable()
export class ClubCommentRepository {
  constructor(
    @InjectRepository(ClubComments)
    private readonly clubRepository: Repository<ClubComments>,
  ) {}
}
