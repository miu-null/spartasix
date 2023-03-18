import { Injectable } from "@nestjs/common";
import { ClubRepository } from "./club.repository";
import _ from "lodash";
@Injectable()
export class ClubService {
  constructor(private readonly clubRepository: ClubRepository) {}

  async getClubs() {
    const data = await this.clubRepository.getClubs();

    return data;
  }

  // users  import 필요? (작성,수정,삭제)
  async createClub(
    userId: number,
    title: string,
    content: string,
    maxMembers: number,
  ) {
    await this.clubRepository.createClub(userId, title, content, maxMembers);
    return true;
  }

  async createApp(
    clubId: number,
    userId: number,
    application: string,
    isAccepted: boolean,
  ) {
    const data = await this.clubRepository.createApp(
      clubId,
      userId,
      application,
      isAccepted,
    );
    return data;
  }

  async updateClub(
    clubId: number,
    userId: number,
    title: string,
    content: string,
    maxMembers: number,
  ) {
    console.log(clubId, title, content, maxMembers);
    const data = await this.clubRepository.updateClub(
      clubId,
      userId,
      title,
      content,
      maxMembers,
    );

    return data;
  }

  async getClubById(clubId: number) {
    const data = await this.clubRepository.getClubById(clubId);

    return data;
  }

  async deleteClub(clubId: number) {
    await this.clubRepository.deleteClubDto(clubId);
  }
}
