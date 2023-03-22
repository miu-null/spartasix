import { Injectable } from "@nestjs/common";
import { ClubRepository } from "./club.repository";
import _ from "lodash";
@Injectable()
export class ClubService {
  constructor(private readonly clubRepository: ClubRepository) { }

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
    return data;
  }

  async deleteClub(id: number) {
    await this.clubRepository.deleteClubDto(id);
  }

  async paginatedResults(page) {
    const data = await this.clubRepository.paginatedResults(page);
    return data;
  }
}
