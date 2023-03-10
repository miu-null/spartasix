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
import { Repository } from "typeorm";

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
      where: { userId },
      select: ["title", "content"],
    });
    const eventPosts = await this.eventpostRepository.find({
      where: { userId },
      select: ["title"],
    });
    return { clubPosts, eventPosts };
  }

  // 　운영중, 참여중인 모임 전체 보기
  async getMyClubs(userId: number) {
    const myOwnClub = await this.clubRepository
      .createQueryBuilder("clubs")
      .where("clubs.userId = :userId", { userId, deletedAt: null })
      .getMany();

    const MyClubApp = await this.clubMembersRepository
      .createQueryBuilder("clubMembers")
      .where("clubMembers.userId = :userId", { userId, deletedAt: null })
      .andWhere("clubMembers.isAccepted = :isAccepted", { isAccepted: true })
      .getMany();

    const MyClub = await this.clubRepository
      .createQueryBuilder("clubs")
      .where("clubs.clubId IN (:clubIds)", {
        clubIds: MyClubApp.map((clubApp) => clubApp.clubId),
      })
      .getMany();

    return { myOwnClub, MyClub };
  }

  // 회원정보 조회
  async getUserInfo(userId: number) {
    return await this.userRepository.findOne({
      where: { userId },
      select: [
        "userId",
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
    console.log(updateUserInfo);
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
      .createQueryBuilder("clubs")
      .where("clubs.userId = :userId", { userId, deletedAt: null })
      .andWhere("clubs.clubId = :clubId", { clubId })
      .getOne();
    // 여기서 운영자, 클럽명(게시물 이름), 최대인원 등 확인

    console.log(currentClub);

    // 여기서 확정된 참여인원 확인 - 클럽 멤버들 확인
    const currentClubMember = await this.clubMembersRepository
      .createQueryBuilder("clubMembers")
      .leftJoin("clubMembers.user", "user")
      .leftJoin("clubMembers.clubs", "clubs")
      .where("clubMembers.clubId = :clubId", { clubId, deletedAt: null })
      .andWhere("clubMembers.isAccepted = :isAccepted", { isAccepted: true })
      .getMany();

    return { currentClub, currentClubMember };
  }

  // 클럽 신청서 전체보기 clubMembers에서, 같은 clubId를 공유하는 정보 찾아오기
  // 그 clubId는 userId로 찾기
  async getClubApps(userId: number) {
    const myOwnClub = await this.clubMembersRepository
      .createQueryBuilder("clubMembers")
      .leftJoin("clubMembers.user", "user")
      .leftJoin("clubMembers.clubs", "clubs")
      .where("clubMembers.userId = :userId", {
        userId,
        deletedAt: null,
      })
      .andWhere("clubMembers.isAccepted = :isAccepted", { isAccepted: false })
      .getMany();
    return myOwnClub;
  }

  // 특정 신청서 조회
  async getThisApp(userId: number, clubMemberId: number) {
    const members = await this.clubMembersRepository
      .createQueryBuilder("members")
      .where("members.userId = :userId", { userId, deletedAt: null })
      .andWhere("members.clubMemberId = :clubMemberId", { clubMemberId })
      .andWhere("members.isAccepted = :isAccepted", { isAccepted: false })
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
    const clubs = await this.clubRepository
      .createQueryBuilder("clubs")
      .where("userId = :userId", { userId })
      .getMany();

    const clubIds = clubs.map((club) => club.clubId);
    console.log(clubIds);
    await this.clubMembersRepository
      .createQueryBuilder("clubMembers")
      .where("clubMemberId = :clubMemberId", { clubMemberId })
      .andWhere("clubId IN (:clubIds)", { clubIds })
      .softDelete()
      .execute();
  }
}
