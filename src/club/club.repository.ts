import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ClubMembers } from "src/entities/clubmembers.entity";
import { Clubs } from "src/entities/clubs.entity";
import { Repository } from "typeorm";

@Injectable()
export class ClubRepository {
  constructor(
    @InjectRepository(Clubs)
    private readonly clubRepository: Repository<Clubs>,
    @InjectRepository(ClubMembers)
    private clubmemberRepository: Repository<ClubMembers>,
  ) {}

  async getClubs() {
    const data = await this.clubRepository.find({
      where: { deletedAt: null },
      select: [
        "clubId",
        "title",
        "maxMembers",
        "createdAt",
        "userId",
      ],
    });

    return data;
  }

  async createClub(
    userId: number,
    title: string,
    content: string,
    maxMembers: number,
  ) {
    await this.clubRepository.insert({
      userId,
      title,
      content,
      maxMembers,
    });

    return true;
  }

  async createApp(
    clubId: number,
    userId: number,
    application: string,
    isAccepted: boolean,
  ) {
    const data = await this.clubmemberRepository.insert({
      clubId,
      userId,
      application,
      isAccepted,
    });

    return data;
  }

  async updateClub(
    clubId: number,
    userId: number,
    title: string,
    content: string,
    maxMembers: number,
  ) {
    const data = await this.clubRepository.update(clubId, {
      userId,
      title,
      content,
      maxMembers,
    });

    return true;
  }

  async getClubById(clubId: number) {
    const data = await this.clubRepository.findOne({
      where: { clubId, deletedAt: null },
      select: [
        "title",
        "content",
        "maxMembers",
        "createdAt",
        "updatedAt",
        "clubId",
      ],
    });

    return data;
  }

  async deleteClubDto(clubId: number) {
    await this.clubRepository.softDelete(clubId);
  }
}
