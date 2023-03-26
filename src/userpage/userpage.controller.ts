import {
  Body,
  Param,
  Controller,
  Get,
  Patch,
  Post,
  Delete,
  Res,
  Request,
  UploadedFile,
  UseInterceptors,
  Redirect,
} from "@nestjs/common";
import { Response } from "express";
import { UserpageService } from "./userpage.service";
import { UseGuards } from "@nestjs/common";
import { UserUpdateDto } from "./dto/userpage.update.dto";
import { AuthGuard } from "@nestjs/passport";
import { Express } from "express";
import * as AWS from "aws-sdk";
import { FileInterceptor } from "@nestjs/platform-express";

@Controller("userpage")
export class UserpageController {
  constructor(private readonly userPageService: UserpageService) {}

  @Get("/:userId")
  // @UseGuards(AuthGuard())
  async getUserInfo(@Param("userId") userId: number, @Res() res: Response) {
    const myInfo = await this.userPageService.getUserInfo(userId);
    return res.render("userInfo", { myInfo });
  }

  @Get("/:userId/post")
  // @UseGuards(AuthGuard())
  async getUserPost(@Param("userId") userId: number) {
    const myPosts = await this.userPageService.getMyPosts(userId);
    return myPosts;
  }

  @Get("/:userId/clubs")
  async getUserClubs(@Param("userId") userId: number) {
    const myClubs = await this.userPageService.getMyClubs(userId);
    return myClubs;
  }

  @Get("/:userId/edit")
  // @UseGuards(AuthGuard())
  async editUserInfo(@Param("userId") userId: number, @Res() res: Response) {
    const myInfo = await this.userPageService.getUserInfo(userId);
    const context = { myInfo };
    return res.render("userInfoEdit", context);
  }

  @Post("/:userId/edit")
  @UseInterceptors(FileInterceptor("userIMG"))
  @Redirect("", 302)
  async updateUser(
    @Param("userId") userId: number,
    @Request() req: Request,
    @Body() data: UserUpdateDto,
    @UploadedFile() uploadedFile: Express.Multer.File,
  ) {
    const userInfo = await this.userPageService.getUserInfo(userId);
    let imgUrl = userInfo.userIMG;

    if (!!uploadedFile) {
      AWS.config.update({
        credentials: {
          accessKeyId: process.env.AWS_ACCESS_KEY,
          secretAccessKey: process.env.AWS_SECRET_KEY,
        },
      });
      const key = `${Date.now() + uploadedFile.originalname}`;
      const upload = await new AWS.S3()
        .putObject({
          Key: key,
          Body: uploadedFile.buffer,
          Bucket: process.env.AWS_BUCKET_NAME,
          ACL: "public-read",
        })
        .promise();
      imgUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/${key}`;
    }
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

    return {
      url: `/userpage/${userId}`,
    };
  }

  @Get("/:userId/clubs/:clubId")
  async getThisClub(
    @Param("userId") userId: number,
    @Param("clubId") clubId: number,
  ) {
    const thisClub = await this.userPageService.getThisClub(userId, clubId);
    return thisClub;
  }

  @Get("/clubs/:userId/app")
  // @UseGuards(AuthGuard())
  async getUserApps(@Param("userId") userId: number, @Res() res: Response) {
    const myApps = await this.userPageService.getClubApps(userId);
    return res.json(myApps);
  }

  @Get("/:userId/clubs/app/:clubMemberId")
  async getThisApp(
    @Param("userId") userId: number,
    @Param("clubMemberId") clubMemberId: number,
  ) {
    const thisApp = await this.userPageService.getThisApp(userId, clubMemberId);
    return thisApp;
  }

  @Patch("/:userId/clubs/app/:clubMemberId")
  @UseGuards(AuthGuard())
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

  @Delete("/:userId/clubs/app/:clubMemberId")
  @UseGuards(AuthGuard())
  async rejectApps(
    @Param("userId") userId: number,
    @Param("clubMemberId") clubMemberId: number,
  ) {
    const notThisApp = this.userPageService.rejectApp(userId, clubMemberId);
    return notThisApp;
  }
}
