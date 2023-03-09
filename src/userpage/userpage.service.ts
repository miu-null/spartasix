import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import _ from "lodash";

import { UserPageRepository } from "./userpage.repository";
import { UserUpdateDto } from "./dto/userpage.update.dto";
import { Users } from "../user/entity/user.entity";
import { Clubs } from "../club/entity/club.entity";
import { EventPosts } from "../event/entity/event.entity";
// import { UserUpdateDto } from "./dto/userpage.update.dto";

@Injectable()
export class UserpageService {
  constructor(private userPageRepository: UserPageRepository) { }

  // // 작성한 글 조회
  // async getMyPosts(userId: number) {
  //   // 회원이 쓴 글 조회 테이블2개에서 정보 가져와서 뿌려주기
  // }

  // 유저정보 조회
  async getUsersInfo(userId: number) {
    return await this.userPageRepository.getUsersInfo(userId);
  }

  // 회원정보 수정
  async updateUser(userId: number, updateUserInfo: UserUpdateDto) {
    console.log(userId);
    // if (userId ===!)

    return await this.userPageRepository.updateUser(userId, updateUserInfo);
  }

  //　운영중인 모임 전체 보기
  async getMyClubs(userId: number) {
    return await this.userPageRepository.getMyClubs(userId);
  }


  // 클럽 신청서 조회
  async getClubApps(userId: number) {
    return await this.userPageRepository.getClubApps(userId);
  }


  // // 신청서 수락
  // async getThisMember(userId: number, clubMemberId: number) {
  //   return await this.userPageRepository.({
  //     where: { userId },
  //     select: [],
  //   });
  // }

  //   async getThisMember(userId: number, clubMemberId: number) {
  //     return await this.clubRepository.find();
  //   }
  // async deleteApps(userId: number, clubMemberId: number) { }

}
