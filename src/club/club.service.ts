import { Injectable } from "@nestjs/common";
import { ClubRepository } from "./club.repository";
import _ from "lodash";
import { userInfo } from "os";
import { ClubCommentService } from "src/comments/clubcomment/clubcomment.service";
@Injectable()
export class ClubService {
  constructor(
    private readonly clubRepository: ClubRepository,
    private readonly clubCommentService: ClubCommentService
    ) { }

    async getClubs() {
      const clubs = await this.clubRepository.getClubs()
      return clubs;
    }

  // users  import 필요? (작성,수정,삭제)
  async createClub(
    userId: number,
    title: string,
    content: string,
    maxMembers: number,
    category: string,
  ) {
    await this.clubRepository.createClub(
      userId,
      title,
      content,
      maxMembers,
      category,
    );
    return true;
  }

  async createApp(
    id: number,
    userId: number,
    application: string,
    isAccepted: boolean,
  ) {
    const data = await this.clubRepository.createApp(
      id,
      userId,
      application,
      isAccepted,
    );
    return data;
  }

  async updateClub(
    id: number,
    userId: number,
    title: string,
    content: string,
    maxMembers: number,
    category: string,
  ) {
    console.log(id, title, content, maxMembers, category);
    const data = await this.clubRepository.updateClub(
      id,
      userId,
      title,
      content,
      maxMembers,
      category,
    );

    return data;
  }

  async getClubById(id: number) {
    const data = await this.clubRepository.getClubById(id);
    console.log(data, '@@@@서비스')

    const comments = await this.clubCommentService.showAllComment(id);
    return {data, comments};
  }

  async deleteClub(userId: number, id: number) {
    await this.clubRepository.deleteClubDto(userId, id);

    return true;
  }
  // async reportClub(
  //   id: number,
  //   userId: number,
  //   clubId: number,
  //   reportReason: string,
  //   reportContent: string,
  // ) {
  //   const data = await this.clubRepository.reportClub(
  //     id,
  //     userId,
  //     clubId,
  //     reportReason,
  //     reportContent,
  //   );
  //   return data;
  // }
}
