import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { ClubMembers } from "../entities/clubmembers.entity";
import { Clubs } from "../entities/clubs.entity";
import { EventPosts } from "../entities/events.entity";
import { Users } from "../entities/users.entity";
import { Between, In, LessThan, MoreThan, Raw, Repository } from "typeorm";

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

  // 회원정보 조회
  async getUserInfo(userId: number, currentUserId: number) {
    if (!currentUserId) {
      throw new UnauthorizedException("로그인 후 이용 가능한 기능입니다.");
    }
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

  // 작성한 글 조회
  async getMyPosts(
    userId: number,
    currentUserId: number,
    startCursor: Date,
    endCursor: Date,
    limit: number,
  ) {
    const eventPosts = await this.eventpostRepository.find({
      where: {
        userId,
        createdAt: startCursor
          ? LessThan(startCursor)
          : endCursor
          ? MoreThan(endCursor)
          : LessThan(new Date()),
      },
      select: ["title", "content"],
      order: { createdAt: "DESC" },
      take: limit,
    });
    const clubPosts = await this.clubRepository.find({
      where: {
        userId,
        createdAt: startCursor
          ? LessThan(startCursor)
          : endCursor
          ? MoreThan(endCursor)
          : LessThan(new Date()),
      },
      select: ["title", "content"],
      order: { createdAt: "DESC" },
      take: limit,
    });
    console.log("???", eventPosts);
    console.log("???", clubPosts);

    const hasNextEventPage = eventPosts.length === limit;
    const hasNextClubPage = clubPosts.length === limit;
    const eventEndCursor = hasNextEventPage
      ? eventPosts[eventPosts.length - 1].createdAt?.toISOString() ?? null
      : null;
    const clubEndCursor = hasNextClubPage
      ? clubPosts[clubPosts.length - 1].createdAt?.toISOString() ?? null
      : null;

    const hasPreviousEventPage = startCursor != null;
    const hasPreviousClubPage = startCursor != null;

    return {
      eventPosts,
      clubPosts,
      pageInfo: {
        hasNextEventPage,
        hasNextClubPage,
        hasPreviousEventPage,
        hasPreviousClubPage,
        eventEndCursor,
        clubEndCursor,
      },
    };
  }

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

    return {
      myOwnClub,
      MyClub,
    };
  }

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

  // 회원정보 수정
  async updateUser(
    userId: number,
    currentUserId,
    updateUserInfo: UserUpdateDto,
    hashpassword,
  ) {
    if (currentUserId !== userId) {
      throw new UnauthorizedException("본인만 사용할 수 있는 기능입니다.");
    }

    const changedInfo = await this.userRepository.update(userId, {
      email: updateUserInfo.email,
      password: hashpassword,
      phone: updateUserInfo.phone,
      nickName: updateUserInfo.nickName,
      snsURL: updateUserInfo.snsUrl,
      userIMG: updateUserInfo.userIMG,
    });
    return changedInfo;
  }

  async getThisClub(userId: number, clubId: number) {
    const currentClub = await this.clubRepository.findOne({
      where: {
        id: clubId,
        userId,
      },
    });
    const currentClubMember = await this.clubMembersRepository.find({
      where: {
        clubId,
        isAccepted: true,
      },
    });
    return { currentClub, currentClubMember };
  }

  async getThisApp(userId: number, clubMemberId: number) {
    const application = await this.clubMembersRepository.findOne({
      where: { id: clubMemberId },
    });
    const user = await this.userRepository.findOne({ where: { id: userId } });
    return { application, user };
  }

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

  async rejectApp(userId: number, clubMemberId: number) {
    await this.clubMembersRepository
      .createQueryBuilder("ClubMembers")
      .softDelete()
      .where("id = :clubMemberId", { clubMemberId })
      .execute();
  }
}
