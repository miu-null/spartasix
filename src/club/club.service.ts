import {
  Injectable,
  // NotFoundException,
  // UnauthorizedException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import _ from "lodash";
import { Clubs } from "src/entities/clubs.entity";
import { Repository } from "typeorm";
import { AuthService } from "src/auth/auth.service";
import { Users } from "src/entities/users.entity";
import { ClubMembersRepository } from "src/userpage/clubmember.repository";
import { CreateAppDto } from "./dto/newApp-club.dto";

@Injectable()
export class ClubService {
  constructor(
    private clubMembersRepository: ClubMembersRepository,
    @InjectRepository(Clubs) private clubRepository: Repository<Clubs>,
  ) { }

  async getClubs() {
    return await this.clubRepository.find({
      where: { deletedAt: null },
      select: [
        "clubId",
        "title",
        "maxMembers",
        "createdAt",
        // "nickName",
        "userId",
      ],
    });
  }

  async getClubById(clubId: number) {
    return await this.clubRepository.findOne({
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
  }
  // @UseGuards(AuthGuard())
  // users  import 필요? (작성,수정,삭제)
  createClub(
    userId: number,
    title: string,
    content: string,
    maxMembers: string,
  ) {
    this.clubRepository.insert({
      userId,
      title,
      content,
      maxMembers,
    });
  }

  async updateClub(
    clubId: number,
    userId: number,
    title: string,
    content: string,
    maxMembers: string,
  ) {
    console.log(clubId, title, content, maxMembers);
    this.clubRepository.update(clubId, {
      userId,
      title,
      content,
      maxMembers,
    });
  }

  async deleteClub(clubId: number) {
    await this.clubRepository.softDelete(clubId);
  }

  async newClubApp(clubId: number, newApp: CreateAppDto) {
    const newclubApp = await this.clubMembersRepository.newClubApp(
      clubId,
      newApp,
    );
    return newclubApp;
  }
}
