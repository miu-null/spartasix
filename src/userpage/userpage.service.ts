import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import _ from "lodash";
import { UserPageRepository } from "./userpage.repository";
import { UserUpdateDto } from "./dto/userpage.update.dto";
// import { UserUpdateDto } from "./dto/userpage.update.dto";

@Injectable()
export class UserpageService {
  constructor(private userPageRepository: UserPageRepository) {}

  //TODO 회원이 쓴 글 내림차순 정렬
  // 작성한 글 조회
  async getMyPosts(userId: number) {
    return await this.userPageRepository.getMyPosts(userId);
  }

  // TODO 서비스코드 데이터 반환값 확인, 데이터 가공로직 추가
  //　운영중, 참여중인 모임 조회
  async getMyClubs(userId: number) {
    return await this.userPageRepository.getMyClubs(userId);
  }

  // 회원정보 조회
  async getUserInfo(userId: number) {
    const data = await this.userPageRepository.getUserInfo(userId);
    const password = data.password.length;

    return {
      userId: data.userId,
      email: data.email,
      password,
      phone: data.phone,
      nickName: data.nickName,
      snsURL: data.snsURL,
      userIMG: data.userIMG,
    }; // 본인 조회
  }

  // TODO 일부 정보 수정 가능하게 만들기/ 권한에 따라 정보수정 기능 부여
  // 회원정보 수정
  async updateUser(userId: number, updateUserInfo: UserUpdateDto) {
    const updatedUser = await this.userPageRepository.updateUser(
      userId,
      updateUserInfo,
    );
    return updatedUser;
  }

  // TODO 서비스코드 데이터 반환값 확인, 데이터 가공로직 추가
  // 특정 클럽정보 조회
  async getThisClub(userId: number, clubId: number) {
    const { currentClub, currentClubMember } =
      await this.userPageRepository.getThisClub(userId, clubId);
    // const clubInfo = currentClub.map((club) => {
    //   return ({ clubId, title, createdAt } = club.dataValues.Clubs);
    // });
    const clubMemberInfo = currentClubMember.map(({ userId }) => {
      return { userId };
    });

    return {
      //clubInfo,
      clubMemberInfo,
    };
  }

  // TODO 서비스코드 데이터 반환값 확인, 데이터 가공로직 추가
  // 클럽 신청서 조회 // 특정 유저만
  async getClubApps(userId: number) {
    const getMyApps = await this.userPageRepository.getClubApps(userId);
    const myApps = getMyApps.map(
      ({ clubMemberId, userId, isAccepted, createdAt }) => {
        return { clubMemberId, userId, isAccepted, createdAt };
      },
    );

    return myApps;
  }

  // TODO 서비스코드 데이터 반환값 확인, 데이터 가공로직 추가
  // 특정 신청서 조회 // 특정 유저만
  async getThisApp(userId: number, clubMemberId: number) {
    const getThisApp = await this.userPageRepository.getThisApp(
      userId,
      clubMemberId,
    );
    // const thisApp = getThisApp.map(
    //   ({ clubMemberId, userId, application, isAccepted, createdAt }) => {
    //     return { clubMemberId, userId, application, isAccepted, createdAt };
    //   },

    // const thisApp = this.userPageRepository.getThisApp(userId, clubMemberId, {
    //   clubmemberId: getThisApp.clubMemberId,
    //   userId: getThisApp.userId,
    //   application: getThisApp.application,
    //   isAccepted: getThisApp.isAccepted,
    //   createdAt: getThisApp.createdAt,
    // });
    // return { clubMemberId, userId, application, isAccepted, createdAt };
    // },
    // );
    // return thisApp;
  }

  // TODO 서비스코드 데이터 반환값 확인, 데이터 가공로직 추가
  // 신청서 수락 // 특정 유저만
  async getThisMember(userId: number, clubMemberId: number) {
    return await this.userPageRepository.getThisMember(userId, clubMemberId);
  }

  // TODO 서비스코드 데이터 반환값 확인, 데이터 가공로직 추가
  // 신청서 거절(삭제)
  async rejectApp(userId: number, clubMemberId: number) {
    return await this.userPageRepository.rejectApp(userId, clubMemberId);
  }
}
