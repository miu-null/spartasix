import { Injectable } from "@nestjs/common";
import _ from "lodash";
import { UserPageRepository } from "./userpage.repository";
import { UserUpdateDto } from "./dto/userpage.update.dto";

@Injectable()
export class UserpageService {
  constructor(private userPageRepository: UserPageRepository) {}

  async getMyPosts(userId: number) {
    const { clubPosts, eventPosts } = await this.userPageRepository.getMyPosts(
      userId,
    );
    return { clubPosts, eventPosts };
  }

  async getMyClubs(userId: number) {
    const { myOwnClub, MyClub } = await this.userPageRepository.getMyClubs(
      userId,
    );
    return {
      myOwnClub,
      MyClub,
    };
  }

  async getUserInfo(userId: number) {
    const data = await this.userPageRepository.getUserInfo(userId);
    const password = data.password.length;
    return {
      userId: data.id,
      email: data.email,
      password: password,
      phone: data.phone,
      nickName: data.nickName,
      snsURL: data.snsURL,
      userIMG: data.userIMG,
    };
  }

  async updateUser(userId: number, updateUserInfo: UserUpdateDto) {
    const updatedUser = await this.userPageRepository.updateUser(
      userId,
      updateUserInfo,
    );
    return updatedUser;
  }

  async getThisClub(userId: number, clubId: number) {
    const { currentClub, currentClubMember } =
      await this.userPageRepository.getThisClub(userId, clubId);
    const clubInfo = [currentClub].map(
      ({ id, title, maxMembers, createdAt }) => {
        return { id, title, maxMembers, createdAt };
      },
    );
    const clubMemberInfo = currentClubMember.map(({ userId }) => {
      return { userId };
    });

    return {
      clubInfo,
      clubMemberInfo,
    };
  }

  async getClubApps(userId: number) {
    const { myOwnClubs } = await this.userPageRepository.getClubApps(userId);
    const myApps = myOwnClubs.map(
      ({ id, user, userId, application, isAccepted, createdAt }) => {
        return {
          id,
          userId,
          isAccepted,
          application,
          nickName: user.nickName,
          createdAt,
        };
      },
    );
    return { myApps };
  }

  async getThisApp(userId: number, clubMemberId: number) {
    const { application, user } = await this.userPageRepository.getThisApp(
      userId,
      clubMemberId,
    );
    application["nickName"] = user.nickName;
    return application;
  }

  async getThisMember(userId: number, clubMemberId: number) {
    return await this.userPageRepository.getThisMember(userId, clubMemberId);
  }

  async rejectApp(userId: number, clubMemberId: number) {
    return await this.userPageRepository.rejectApp(userId, clubMemberId);
  }
}
