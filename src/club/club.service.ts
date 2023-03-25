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

  async getClubById(clubId: number) {
    const data = await this.clubRepository.getClubById(clubId);
    console.log(data, '@@@@서비스')

    const comments = await this.clubCommentService.showAllComment(clubId);
    return {data, comments};
  }

  async deleteClub(id: number) {
    await this.clubRepository.deleteClubDto(id);
  }

  async paginatedResults(page) {
    const data = await this.clubRepository.paginatedResults(page);
    return data;
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
