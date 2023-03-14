import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ClubMembers } from "../entities/clubmembers.entity";
import { Injectable } from "@nestjs/common";
import { CreateAppDto } from "../club/dto/newApp-club.dto";

@Injectable()
export class ClubMembersRepository {
  constructor(
    @InjectRepository(ClubMembers)
    private readonly clubMembersRepository: Repository<ClubMembers>,
  ) {}

  async newClubApp(clubId: number, newApp: CreateAppDto) {
    console.log(newApp);
    const addNewClubApp = await this.clubMembersRepository.insert({
      clubId,
      userId: newApp.userId,
      application: newApp.application,
      isAccepted: newApp.isAccepted,
    });
    return addNewClubApp;
  }
}
