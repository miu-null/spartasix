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
      select: ["clubId", "title", "maxMembers", "createdAt", "userId"],
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

  //페이지네이션
  async paginatedResults(page, term?: string) {
    const take = 4;
    const selectedData = await this.clubRepository.find({});
    // .where("Clubs.userId = :userId")
    // .leftJoinAndSelect("Clubs.user", "user")
    // .orderBy("Clubs.clubId", "DESC") //최신순(내림차순)
    // .getMany();

    console.log(selectedData);

    const totalDataCount = selectedData.length; //불러온 데이터 목록 수
    const startIndex = (page - 1) * take;
    const endIndex = page * take;

    const slicedData = selectedData.slice(startIndex, endIndex); // 페이지당 조회할 데이터 묶음
    const lastPage = Math.ceil(totalDataCount / take); //생성될 페이지 수

    const unitSize = 3; // 페이지 묶음 단위 : 3개씩 < 1 2 3>  <4 5 6>
    const numOfUnits = Math.floor((page - 1) / unitSize); //<1 2 3> 페이지는 0 번째 index
    const unitStart = numOfUnits * unitSize + 1; //0번째 묶음의 시작은 1페이지, 1번째 묶음 시작은 4페이지...
    const unitEnd = unitStart + (unitSize - 1); //0번째 묶음의 끝은 3페이지, 1번째 묶음 끝은 6페이지
    const paginatedDemand = { page, slicedData, lastPage, unitStart, unitEnd };

    return {
      ...paginatedDemand,
    };
  }
}
