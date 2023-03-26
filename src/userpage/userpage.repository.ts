import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { ClubMembers } from "../entities/clubmembers.entity";
import { Clubs } from "../entities/clubs.entity";
import { EventPosts } from "../entities/events.entity";
import { Users } from "../entities/users.entity";
import { In, Repository } from "typeorm";

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

  async getMyPosts(userId: number) {
    const clubPosts = await this.clubRepository.find({
      where: { userId },
      select: ["title", "content"],
    });
    const eventPosts = await this.eventpostRepository.find({
      where: { userId },
      select: ["title", "content"],
    });

    return { clubPosts, eventPosts };
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
