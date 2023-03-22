import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import _ from "lodash";
import { UserPageRepository } from "./userpage.repository";
import { UserUpdateDto } from "./dto/userpage.update.dto";

@Injectable()
export class UserpageService {
  constructor(private userPageRepository: UserPageRepository) {}

  //TODO 회원이 쓴 글 내림차순 정렬
  // 작성한 글 조회
  async getMyPosts(userId: number) {
    const { clubPosts, eventPosts } = await this.userPageRepository.getMyPosts(
      userId,
    );
    clubPosts.sort((a: any, b: any) => {
      return a.createdAt - b.createdAt;
    });
    eventPosts.sort((a: any, b: any) => {
      return a.createdAt - b.createdAt;
    });
    return { clubPosts, eventPosts };
  }

  //　운영중, 참여중인 모임 조회
  async getMyClubs(userId: number) {
    return await this.userPageRepository.getMyClubs(userId);
  }

  // 회원정보 조회
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
    }; // 본인 조회
  }
  // 회원정보 수정
  async updateUser(userId: number, updateUserInfo: UserUpdateDto) {
    const updatedUser = await this.userPageRepository.updateUser(
      userId,
      updateUserInfo,
    );
    return updatedUser;
  }

  // 특정 클럽정보 조회
  async getThisClub(userId: number, clubId: number) {
    const { currentClub, currentClubMember } =
      await this.userPageRepository.getThisClub(userId, clubId);
    const clubInfo = [currentClub].map(
      ({ id, title, maxMembers, createdAt }) => {
        return { id, title, maxMembers, createdAt };
        // = club.dataValues.Clubs);
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

  // 클럽 신청서 조회 // 특정 유저만
  async getClubApps(userId: number) {
    const { myOwnClubs } = await this.userPageRepository.getClubApps(userId);
    const myApps = myOwnClubs.map(
      ({ id, user, userId, isAccepted, createdAt }) => {
        return { id, userId, isAccepted, nickName: user.nickName, createdAt };
      },
    );
    return { myApps };
  }

  // 특정 신청서 조회 // 특정 유저만
  async getThisApp(userId: number, clubMemberId: number) {
    const getThisApp = await this.userPageRepository.getThisApp(
      userId,
      clubMemberId,
    );
    const thisApp = [getThisApp].map(
      ({ id, userId, application, isAccepted, createdAt }) => {
        return { id, userId, application, isAccepted, createdAt };
      },
    );
    return thisApp;
  }

  // 신청서 수락 // 특정 유저만
  async getThisMember(userId: number, clubMemberId: number) {
    return await this.userPageRepository.getThisMember(userId, clubMemberId);
  }

  // 신청서 거절(삭제)
  async rejectApp(userId: number, clubMemberId: number) {
    return await this.userPageRepository.rejectApp(userId, clubMemberId);
  }
}
