import {
  Body,
  Param,
  Controller,
  Get,
  Patch,
  Delete,
  Res,
  Request,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { Response } from "express";
import { UserpageService } from "./userpage.service";
import { UseGuards } from "@nestjs/common";
import { UserUpdateDto } from "./dto/userpage.update.dto";
import { AuthGuard } from "@nestjs/passport";
import { Express } from "express";
import * as AWS from "aws-sdk";
// import { S3Client, ListBucketsCommand } from "@aws-sdk/client-s3";
import { FileInterceptor } from "@nestjs/platform-express";

@Controller("userpage")
export class UserpageController {
  constructor(
    private readonly userPageService: UserpageService, // private readonly s3Client: S3Client,
  ) {}

  // 유저정보, 회원 게시글, 운영 클럽 + 가입한 클럽 조회기능
  // TODO 유저정보 조회 - 민감정보 열람권한은 본인만 가능하게 (프론트에서)
  @Get("/:userId")
  // @UseGuards(AuthGuard())
  async getUserInfo(@Param("userId") userId: number, @Res() res: Response) {
    const myPosts = await this.userPageService.getMyPosts(userId);
    const myClubs = await this.userPageService.getMyClubs(userId);
    const myInfo = await this.userPageService.getUserInfo(userId);
    const myApps = await this.userPageService.getClubApps(userId);


  @Get("/:userId/clubs/app") // 신청서 전체조회 (완료)
  async getClubApps(@Param("userId") userId: number) {
    const users = await this.userPageService.getClubApps(userId);
    return users
  }

  @Get("/:userId/clubs/app/:clubMemberId") // 특정 신청서 조회 (완료)
  async getThisApp(
    @Param("userId") userId: number,
    @Param("clubMemberId") clubMemberId: number,
  ) {
    const thisApp = await this.userPageService.getThisApp(userId, clubMemberId);
    return thisApp;
  }

  @Patch("/info/:userId") // TODO 내 정보 수정하기, 본인검증로직 추가할 것
  @UseInterceptors(FileInterceptor("userIMG"))
  async updateUser(
    @Param("userId") userId: number,
    @Request() req: Request, // @Body() data: UserUpdateDto,
    @Body() data: UserUpdateDto,
    @UploadedFile() uploadedFile: Express.Multer.File,
  ) {
    AWS.config.update({
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_KEY,
      },
    });
    const key = `${Date.now() + uploadedFile.originalname}`;
    // AWS 객체 생성
    const upload = await new AWS.S3()
      .putObject({
        Key: key,
        Body: uploadedFile.buffer,
        Bucket: process.env.AWS_BUCKET_NAME,
        ACL: "public-read",
      })
      .promise();
    const imgUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/${key}`;
    Object.assign({
      statusCode: 201,
      message: `이미지 등록 성공`,
      data: { url: imgUrl },
    });

    const changedInfo = await this.userPageService.updateUser(userId, {
      email: data.email,
      password: data.password,
      phone: data.phone,
      nickName: data.nickName,
      snsUrl: data.snsUrl,
      userIMG: imgUrl,
    });
    return changedInfo;
  }

  @Get("/:userId/clubs/:clubId") // TODO 특정 클럽정보 조회
  async getThisClub(
    @Param("userId") userId: number,
    @Param("clubId") clubId: number,
  ) {
    const thisClub = await this.userPageService.getThisClub(userId, clubId);
    return thisClub;
  }

  @Patch("/:userId/clubs/app/:clubMemberId") // 모임신청 수락 - 모임신청 테이블의 isAccepted true (완료)
  async getThisMember(
    @Param("userId") userId: number,
    @Param("clubMemberId") clubMemberId: number,
  ) {
    const thisMember = await this.userPageService.getThisMember(
      userId,
      clubMemberId,
    );
    return thisMember;
  }

  @Delete("/:userId/clubs/app/:clubMemberId") // 모임신청 삭제 - 모임신청 테이블에서 삭제하기 (완료)
  async rejectApps(
    @Param("userId") userId: number,
    @Param("clubMemberId") clubMemberId: number,
  ) {
    const notThisApp = this.userPageService.rejectApp(userId, clubMemberId);
    return notThisApp;

  }
}
