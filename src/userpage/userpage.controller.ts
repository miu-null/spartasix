
import {
  Body,
  Param,
  Controller,
  Get,
  Patch,
  Delete,
  Request,
} from "@nestjs/common";
import { UserpageService } from "./userpage.service";
import { UserUpdateDto } from "./dto/userpage.update.dto";


@Controller("userpage")
export class UserpageController {
  constructor(private readonly userPageService: UserpageService) { }

  //   @Get("/:userId") // 회원이 쓴 글 조회 - 시간순 내림차정렬 추가+ 게시판 글 섞어보는 로직
  //   async getMyPosts(@Param("userId") userId: number) {
  //     return await this.userPageService.getMyPosts(userId);
  //   }


  @Get("/info/:userId") // 유저정보 조회
  async getUserInfo(
    @Param("userId") userId: number,
    @Request() req, // @Body() data: UserUpdateDto,
  ) {
    const user: any = req.user;
    // console.log(user);
    const data = await this.userPageService.getUsersInfo(userId);
    const password = data.password.length;

    // 로그인한 user 정보가 있어야만 정보가 불러와지

    // 아래 내용은 프론트에서 작업하기
    //

    if (userId !== user.id) {
      return {
        userIMG: data.userIMG,
        nickName: data.nickName,
        email: data.email,
        snsURL: data.snsURL,
      }; // 타 유저 조회
    }
    if (userId === user.id) {
      return {
        email: data.email,
        password,
        phone: data.phone,
        nickName: data.nickName,
        snsURL: data.snsURL,
        userIMG: data.userIMG,
      }; // 본인 조회
    }
  }

  @Patch("/info/:userId") // 내 정보 수정하기, 본인검증로직 추가할 것
  async updateUser(
    @Param("userId") userId: number,
    @Request() req, // @Body() data: UserUpdateDto,
    @Body() data: UserUpdateDto,
  ) {
    const user: any = req.user;
    // console.log(user);
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

    // 401 throw error

    //   }
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

  //   @Get("/:userId/clubs/app/:clubMemberId") // 신청서 하나 보기 //
  //   async getThisApp(
  //     @Param("userId") userId: number,
  //     @Param("clubMemberId") clubMemberId: number,
  //   ) {
  //     return await this.userPageService.getThisApp(userId, clubMemberId);
  //   }

  // @Patch("/:userId/clubs/app/:clubMemberId") // 모임신청 수락 - 모임신청 테이블의 acceptedMembers +1
  // async getThisMember(
  //   @Param("userId") userId: number,
  //   @Param("clubMemberId") clubMemberId: number,
  // ) {
  //   return await this.userPageService.getThisMember(userId, clubMemberId);
  // }

  //   @Delete("/:userId/clubs/app/:clubMemberId") // 모임신청 삭제 - 모임신청 테이블에서 삭제하기
  //   async rejectApps(
  //     @Param("userId") userId: number,
  //     @Param("clubMemberId") clubMemberId: number,
  //   ) {
  //     return this.userPageService.deleteApps(userId, clubMemberId);
  //   }
  // }
}

