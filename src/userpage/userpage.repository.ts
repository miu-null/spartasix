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
      // relations: { user: true },
      where: { userId },
      select: ["title", "content"],
      // order: { id: "DESC" },
    });
    const eventPosts = await this.eventpostRepository.find({
      // relations: { user: true },
      where: { userId },
      select: ["title", "content"],
      // order: { id: "DESC" },
    });

    return { clubPosts, eventPosts };
  }

  // 　운영중, 참여중인 모임 전체 보기
  async getMyClubs(userId: number) {
    const myOwnClub = await this.clubRepository.find({ where: { userId } });
    const MyClubApp = await this.clubMembersRepository.find({
      where: {
        userId,
        isAccepted: true,
      },
      select: ["clubId"],
    });

    const MyClub = await this.clubRepository.find({
      where: {
        id: In(MyClubApp.map((clubApp) => clubApp.clubId)),
      },
    });
    console.log(myOwnClub, MyClub);
    return {
      myOwnClub,
      MyClub,
    };
  }

  // *클럽 신청서 전체보기
  async getClubApps(userId: number) {
    const myClubs = await this.clubRepository.find({
      where: {
        userId,
      },
    });

    const clubApps = await this.clubMembersRepository.find({
      where: {
        clubId: In(myClubs.map((club) => club.id)),
        isAccepted: false,
      },
    });

    const users = await this.userRepository.find({
      where: {
        id: In(clubApps.map((clubMember) => clubMember.userId)),
      },
    });

    const userMap = users.reduce((acc, user) => {
      acc[user.id] = user;
      return acc;
    }, {});

    const myOwnClubs = clubApps.map((clubApp) => ({
      ...clubApp,
      user: userMap[clubApp.userId],
    }));
    return { myOwnClubs };
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
    const currentClub = await this.clubRepository.findOne({
      where: {
        id: clubId,
        userId,
      },
    });
    // 여기서 운영자, 클럽명(게시물 이름), 최대인원 등 확인

    // 여기서 확정된 참여인원 확인 - 클럽 멤버들 확인
    const currentClubMember = await this.clubMembersRepository.find({
      where: {
        clubId,
        isAccepted: true,
      },
    });
    return { currentClub, currentClubMember };
  }

  // TODO 특정 신청서 조회
  async getThisApp(userId: number, clubMemberId: number) {
    const application = await this.clubMembersRepository.findOne({
      where: { id: clubMemberId },
    });
    const user = await this.userRepository.findOne({ where: { id: userId } });
    return { application, user };
  }
  // 신청서 수락
  async getThisMember(userId: number, clubMemberId: number) {
    const { application: thisApp } = await this.getThisApp(
      userId,
      clubMemberId,
    );
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
      .where("id = :clubMemberId", { clubMemberId })
      .execute();
  }
}
