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

  // // 작성한 글 조회
  // async getMyPosts(userId: number) {
  //   // 회원이 쓴 글 조회 테이블2개에서 정보 가져와서 뿌려주기
  // }

  // 유저정보 조회

  async getUserInfo(userId: number, user: any) {
    const data = await this.userPageRepository.getUserInfo(userId);
    const password = data.password.length;
    return {
      email: data.email,
      password,
      phone: data.phone,
      nickName: data.nickName,
      snsURL: data.snsURL,
      userIMG: data.userIMG,
    }; // 본인 조회
  }
  
  // 회원정보 수정
  async updateUser(userId: number, updateUserInfo: UserUpdateDto) {
    // if (userId ===!)
    return await this.userPageRepository.updateUser(userId, updateUserInfo);
  }

  //　운영중인 모임 전체 보기
  async getMyClubs(userId: number) {
    return await this.userPageRepository.getMyClubs(userId);
  }

  // 특정 클럽정보 조회
  async getThisClub(userId: number, clubId: number) {
    return await this.userPageRepository.getThisClub(userId, clubId);
  }

  // 클럽 신청서 조회 // 특정 유저만
  async getClubApps(userId: number) {
    return await this.userPageRepository.getClubApps(userId);
  }

  // 특정 신청서 조회 // 특정 유저만
  async getThisApp(userId: number, clubMemberId: number) {
    return await this.userPageRepository.getThisApp(userId, clubMemberId);
  }

  // 신청서 수락 // 특정 유저만
  async getThisMember(userId: number, clubMemberId: number) {
    return await this.userPageRepository.getThisMember(userId, clubMemberId);
  }

  async rejectApp(userId: number, clubMemberId: number) {
    return await this.userPageRepository.rejectApp(userId, clubMemberId);
  }
}
