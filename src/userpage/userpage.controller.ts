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
import { Response } from "express";
import { UserpageService } from "./userpage.service";
import { UserUpdateDto } from "./dto/userpage.update.dto";

@Controller("userpage")
export class UserpageController {
  constructor(private readonly userPageService: UserpageService) {}

  //   @Get("/:userId") // 회원이 쓴 글 조회 - 시간순 내림차정렬 추가+ 게시판 글 섞어보는 로직
  //   async getMyPosts(@Param("userId") userId: number) {
  //     return await this.userPageService.getMyPosts(userId);
  //   }

  // @Get("/info/:userId") // 유저정보 조회
  // async getUserInfo(
  //   @Param("userId") userId: number,
  //   @Request() req, // @Body() data: UserUpdateDto,
  // ) {
  //   const user: any = req.user;
  //   return await this.userPageService.getUserInfo(userId, user);
  // }

  //////////////////////유저 목록 조회 후, 유저페이지 연결 테스트
  @Get("/info/:userId") // 유저정보 조회
  async getUserInfo(
    @Param("userId") userId: number,
    @Request() req, // @Body() data: UserUpdateDto,
    @Res() res: Response
  ) {
    const terms = await this.userPageService.getUserInfo(userId);
    console.log(terms);
    return res.render("./userpage/userpage.ejs", {
      title: "검색결과",
      terms,
    });
  }


  @Patch("/info/:userId") // 내 정보 수정하기, 본인검증로직 추가할 것
  async updateUser(
    @Param("userId") userId: number,
    @Request() req, // @Body() data: UserUpdateDto,
    @Body() data: UserUpdateDto,
  ) {
    const user: any = req.user;

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

  // 운영중인 모임 전체보기
  @Get("/:userId/clubs")
  async getMyClubs(@Param("userId") userId: number) {
    return await this.userPageService.getMyClubs(userId);
  }

  //   @Get("/:userId/clubs/:clubId") // 참여중인 모임 하나 보기
  //   async getThisClub( 이거 개발할 필요가 있나.. 요?
  //     @Param("userId") userId: number,
  //     @Param("clubId") clubId: number,
  //   ) {
  //     return await this.userPageService.getThisClub(clubId);
  //   }

  @Get("/:userId/clubs/app") // 신청서 전체조회
  async getClubApps(@Param("userId") userId: number) {
    return await this.userPageService.getClubApps(userId);
    

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
