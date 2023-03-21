import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { ClubMembers } from "../entities/clubmembers.entity";
import { Clubs } from "../entities/clubs.entity";
import { EventPosts } from "../entities/eventposts.entity";
import { Users } from "../entities/users.entity";
import { In, Raw, Repository } from "typeorm";

import { UserUpdateDto } from "./dto/userpage.update.dto";

@Injectable()
export class UserPageRepository {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
    @InjectRepository(Clubs)
    private readonly clubRepository: Repository<Clubs>,
    @InjectRepository(ClubMembers)
    private readonly clubMembersRepository: Repository<ClubMembers>,
    @InjectRepository(EventPosts)
    private readonly eventpostRepository: Repository<EventPosts>,
    private jwtService: JwtService,
  ) {}

  // 작성한 글 조회
  async getMyPosts(userId: number) {
    const clubPosts = await this.clubRepository.find({
      relations: { user: true },
      where: { user: { id: userId } },
      select: ["title", "content"],
    });
    const eventPosts = await this.eventpostRepository.find({
      relations: { user: true },
      where: { user: { id: userId } },
      select: ["title"],
    });
    return { clubPosts, eventPosts };
  }

  // 　운영중, 참여중인 모임 전체 보기
  async getMyClubs(userId: number) {
    const myOwnClub = await this.clubRepository
      .createQueryBuilder("Clubs")
      .where("Clubs.userId = :userId", { userId, deletedAt: null })
      .getMany();

    const MyClubApp = await this.clubMembersRepository
      .createQueryBuilder("ClubMembers")
      .where("ClubMembers.userId = :userId", { userId, deletedAt: null })
      .andWhere("ClubMembers.isAccepted = :isAccepted", { isAccepted: true })
      .getMany();

    const MyClub = MyClubApp.length
      ? await this.clubRepository
          .createQueryBuilder("Clubs")
          .where("Clubs.clubId IN (:...clubIds)", {
            clubIds: MyClubApp.map((clubApp) => clubApp.clubId),
          })
          .getMany()
      : [];
    return {
      myOwnClub,
      MyClub,
    };
  }

  // *클럽 신청서 전체보기
  async getClubApps(userId: number) {
    const myClubs = await this.clubRepository;
    // 쿼리 수정 예정
    return myClubs;
  }

  // 회원정보 조회
  async getUserInfo(userId: number) {
    return await this.userRepository.findOne({
      where: { id: userId },
      select: [
        "id",
        "email",
        "password",
        "phone",
        "nickName",
        "snsURL",
        "userIMG",
        "createdAt",
      ],
    });
  }

  // 회원정보 수정
  async updateUser(userId: number, updateUserInfo: UserUpdateDto) {
    const changedInfo = await this.userRepository.update(userId, {
      email: updateUserInfo.email,
      password: updateUserInfo.password,
      phone: updateUserInfo.phone,
      nickName: updateUserInfo.nickName,
      snsURL: updateUserInfo.snsUrl,
      userIMG: updateUserInfo.userIMG,
    });
    return changedInfo;
    //
  }

  // 특정 클럽정보 조회 (운영자, 참여인원 보여주기)
  async getThisClub(userId: number, clubId: number) {
    const currentClub = await this.clubRepository
      .createQueryBuilder("Clubs")
      .where("Clubs.userId = :userId", { userId, deletedAt: null })
      .andWhere("Clubs.clubId = :clubId", { clubId })
      .getOne();
    // 여기서 운영자, 클럽명(게시물 이름), 최대인원 등 확인

    // 여기서 확정된 참여인원 확인 - 클럽 멤버들 확인
    const currentClubMember = await this.clubMembersRepository
      .createQueryBuilder("ClubMembers")
      .where("clubId IN (:clubId)", { clubId, deletedAt: null })
      .andWhere("ClubMembers.isAccepted = :isAccepted", { isAccepted: true })
      .getMany();
    return { currentClub, currentClubMember };
  }

  // TODO 특정 신청서 조회
  async getThisApp(userId: number, clubMemberId: number) {
    const members = await this.clubMembersRepository
      .createQueryBuilder("ClubMembers")
      .andWhere("ClubMembers.clubMemberId = :clubMemberId", { clubMemberId })
      .getOne();
    return members;
  }

  // 신청서 수락
  async getThisMember(userId: number, clubMemberId: number) {
    const thisApp = await this.getThisApp(userId, clubMemberId);
    if (thisApp) {
      thisApp.isAccepted = true;
      await this.clubMembersRepository.save(thisApp);
    }
  }

  // 신청서 거절
  async rejectApp(userId: number, clubMemberId: number) {
    await this.clubMembersRepository
      .createQueryBuilder("ClubMembers")
      .softDelete()
      .where("clubMemberId = :clubMemberId", { clubMemberId })
      .execute();
  }
}
