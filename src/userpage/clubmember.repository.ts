import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ClubMembers } from "../entities/clubmembers.entity";
import { Injectable } from "@nestjs/common";

@Injectable()
export class ClubMembersRepository {
  constructor(
    @InjectRepository(ClubMembers)
    private readonly clubMembersRepository: Repository<ClubMembers>,
  ) {}

  async createClubMember(
    userId: number,
    clubId: number,
    application: string,
    isAccepted: boolean,
  ) {
    return await this.clubMembersRepository.insert({
      userId,
      clubId,
      application,
      isAccepted,
    });
  }
}
