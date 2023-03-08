import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import _ from "lodash";
import { Repository } from "typeorm";
import { Clubs } from "./entity/club.entity";

@Injectable()
export class ClubService {
  constructor(
    @InjectRepository(Clubs) private clubRepository: Repository<Clubs>,
  ) {}

  async getClubs() {
    return await this.clubRepository.find({
      where: { deletedAt: null },
      // 조회수가 필요할경우 컬럼 추가 필요?
      select: ["userId", "title", "createdAt"],
    });
  }

  async getClubById(clubId: number) {
    return await this.clubRepository.findOne({
      where: { clubId, deletedAt: null },
      select: ["userId", "title", "content", "createdAt", "updatedAt"],
    });
  }

  createClub(title: string, content: string, maxMembers: number) {
    this.clubRepository.insert({
      title,
      content,
      maxMembers,
    });
  }
}
// 자신이 쓴 글을 수정,삭제 기능 -> Users 테이블에서 어떻게 비교?
//   async updateClub(
//     clubId: number,
//     title: string,
//     content: string,
//     password: number,
//   ) {
//     await this.checkPassword(clubId, password);
//     this.clubRepository.update(clubId, { title, content });
//   }

//   async deleteClub(clubId: number, password: number) {
//     await this.checkPassword(clubId, password);
//     this.clubRepository.softDelete(clubId);
//   }

//   private async checkPassword(clubId: number, password: number) {
//     const club = await this.clubRepository.findOne({
//       where: { clubId, deletedAt: null },
//       select: ["password"],
//     });
//     if (_.isNil(club)) {
//       throw new NotFoundException(`not found. id: ${clubId}`);
//     }

//     if (club.password !== password.toString()) {
//       throw new UnauthorizedException(`password is not correct. id: ${clubId}`);
//     }
//   }
// }
