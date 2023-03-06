// import { Body, Param, Controller, Get, Patch, Delete } from "@nestjs/common";
// import { UserpageService } from "./userpage.service";
// import { UserUpdateDto } from "./userpage.update.dto";

// @Controller("userpage")
// export class UserpageController {
//   constructor(private readonly userPageService: UserpageService) {}

//   @Get("/:userId") // 회원이 쓴 글 조회 - 시간순 내림차정렬 추가할 것
//   async getMyPosts(@Param("userId") userId: number) {
//     return await this.userPageService.getMyPosts(userId);
//   }
//   @Patch("/:userId") // 회원정보 수정, 사진도 포함해서 수정 가능하면 코드 합칠 것. //
//   async updateUser(
//     @Param("userId") userId: number,
//     @Body() data: UserUpdateDto,
//   ) {
//     return await this.userPageService.updateUser(userId, {
//       password: data.password,
//       phone: data.phone,
//       nickName: data.nickName,
//       snsUrl: data.snsUrl,
//       userIMG: data.userIMG,
//     });
//   }

//   @Get("/:userId/clubs") // 운영중인 모임 전체보기
//   async getMyClubs(@Param("userId") userId: number) {
//     return await this.userPageService.getMyClubs(userId);
//   }

//   //   @Get("/:userId/clubs/:clubId") // 참여중인 모임 하나 보기
//   //   async getThisClub( 이거 개발할 필요가 있나.. 요?
//   //     @Param("userId") userId: number,
//   //     @Param("clubId") clubId: number,
//   //   ) {
//   //     return await this.userPageService.getThisClub(clubId);
//   //   }

//   @Get("/:userId/clubs/app") // 신청서 전체조회
//   async getClubApps(@Param("userId") userId: number) {
//     return await this.userPageService.getClubApps(userId);
//   }

//   @Get("/:userId/clubs/app/:appId") // 신청서 하나 보기  //
//   async getThisApp(
//     @Param("userId") userId: number,
//     @Param("appId") appId: number,
//   ) {
//     return await this.userPageService.getThisApp(userId, appId);
//   }

//   @Patch("/:userId/clubs/app/:appId") // 모임신청 수락 - 모임신청 테이블의 acceptedMembers +1
//   async getThisMember(
//     @Param("userId") userId: number,
//     @Param("appId") appId: number,
//   ) {
//     return await this.userPageService.getThisMember(userId, appId);
//   }

//   @Delete("/:userId/clubs/app/:appId") // 모임신청 삭제 - 모임신청 테이블에서 삭제하기
//   async deleteApps(
//     @Param("userId") userId: number,
//     @Param("appId") appId: number,
//   ) {
//     return this.userPageService.deleteApps(userId, appId);
//   }
// }
