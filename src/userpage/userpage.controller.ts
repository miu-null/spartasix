import {
  Body,
  Param,
  Controller,
  Get,
  Patch,
  Delete,
  Request,
  Res,
} from "@nestjs/common";
import { UserpageService } from "./userpage.service";
import { Response } from "express";

import { UserUpdateDto } from "./dto/userpage.update.dto";

@Controller("userpage")
export class UserpageController {
  constructor(private readonly userPageService: UserpageService) {}

  // 유저정보, 회원 게시글, 운영 클럽 + 가입한 클럽 조회기능
  // TODO 유저정보 조회 - 민감정보 열람은 권한은 본인만 가능하게 (프론트에서)
  @Get("/:userId")
  async getMyPosts(@Param("userId") userId: number, @Res() res: Response) {
    const myPosts = await this.userPageService.getMyPosts(userId);
    const myClubs = await this.userPageService.getMyClubs(userId);
    const myInfo = await this.userPageService.getUserInfo(userId);

    const context = { myPosts, myClubs, myInfo };

    return res.render("userpage/userInfo.ejs", context);
  }

  @Get("/:userId/clubs/app") // 신청서 전체조회
  async getClubApps(@Param("userId") userId: number) {
    console.log(userId);
    return await this.userPageService.getClubApps(userId);
  }

  @Patch("/info/:userId") // 내 정보 수정하기, 본인검증로직 추가할 것
  async updateUser(
    @Param("userId") userId: number,
    @Request() req, // @Body() data: UserUpdateDto,
    @Body() data: UserUpdateDto,
  ) {
    console.log(1);
    // const user: any = req.user;

    // const thisData = await this.userPageService.getUsersInfo(userId);
    // const password = data.password.length;
    // 인증된 사람만 patch에 들어올 수 있게- authguard에서 처리
    // 여기서는 요청을 보내는 것 자체만
    // if(userId !== user.id ){
    // }
    // if (userId === user.id) {
    const changedInfo = await this.userPageService.updateUser(userId, {
      email: data.email,
      password: data.password,
      phone: data.phone,
      nickName: data.nickName,
      snsUrl: data.snsUrl,
      userIMG: data.userIMG,
    });
    return changedInfo;
  }

  @Get("/:userId/clubs/:clubId") // 특정 클럽정보 조회
  async getThisClub(
    @Param("userId") userId: number,
    @Param("clubId") clubId: number,
  ) {
    return await this.userPageService.getThisClub(userId, clubId);
  }

  @Get("/:userId/clubs/app/:clubMemberId") // 특정 신청서 조회 //
  async getThisApp(
    @Param("userId") userId: number,
    @Param("clubMemberId") clubMemberId: number,
  ) {
    return await this.userPageService.getThisApp(userId, clubMemberId);
  }

  @Patch("/:userId/clubs/app/:clubMemberId") // 모임신청 수락 - 모임신청 테이블의 acceptedMembers +1
  async getThisMember(
    @Param("userId") userId: number,
    @Param("clubMemberId") clubMemberId: number,
  ) {
    return await this.userPageService.getThisMember(userId, clubMemberId);
  }

  @Delete("/:userId/clubs/app/:clubMemberId") // 모임신청 삭제 - 모임신청 테이블에서 삭제하기
  async rejectApps(
    @Param("userId") userId: number,
    @Param("clubMemberId") clubMemberId: number,
  ) {
    return this.userPageService.rejectApp(userId, clubMemberId);
  }
}
