import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import _ from "lodash";
import { Clubs } from "src/entities/clubs.entity";
import { Repository } from "typeorm";

@Injectable()
export class ClubService {
  constructor(
    @InjectRepository(Clubs) private clubRepository: Repository<Clubs>,
  ) { }

  async getClubs() {
    return await this.clubRepository.find({
      where: { deletedAt: null },
      select: ["clubId", "title", "createdAt"],
    });
  }

  async getClubById(clubId: number) {
    return await this.clubRepository.findOne({
      where: { clubId, deletedAt: null },
      select: ["clubId", "title", "content", "createdAt", "updatedAt"],
    });
  }

  createClub(title: string, content: string, maxMembers: string) {
    this.clubRepository.insert({
      title,
      content,
      maxMembers,
    });
  }

  async updateClub(
    clubId: number,
    title: string,
    content: string,
    maxMembers: string,
  ) {
    this.clubRepository.update(clubId, {
      title,
      content,
      maxMembers,
    });
  }

  async deleteClub(clubId: number) {
    await this.clubRepository.softDelete(clubId);
  }
}
