import { Injectable } from "@nestjs/common";
import { ClubRepository } from "./club.repository";
import _ from "lodash";
import { ClubCommentService } from "src/comments/clubcomment/clubcomment.service";

@Injectable()
export class ClubService {
  constructor(
    private readonly clubRepository: ClubRepository,
    private readonly clubCommentService: ClubCommentService,
  ) { }

  async getClubs() {
    const clubs = await this.clubRepository.getClubs();
    return clubs;
  }

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
    const comments = await this.clubCommentService.showAllComment(id);
    return { data, comments };
  }

  async deleteClub(userId: number, id: number) {
    await this.clubRepository.deleteClubDto(userId, id);
    return true;
  }

  async getClubMember(clubId: number) {
    const nowClubMember = await this.clubRepository.getClubMember(clubId);
    return nowClubMember
  }

  async reportClub(
    userId: number,
    clubId: number,
    reportReason: string,
    reportContent: string,
  ) {
    const data = await this.clubRepository.reportClub(
      userId,
      clubId,
      reportReason,
      reportContent,
    );
    return data;
  }
}
