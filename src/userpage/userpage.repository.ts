import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Users } from "src/user/entity/user.entity";
import { Clubs } from "src/club/entity/club.entity";
import { EventPosts } from "src/event/entity/event.entity";
import { ClubMembers } from "./entity/clubmembers.entity";
import { UserUpdateDto } from "./dto/userpage.update.dto";

@Injectable()
export class UserPageRepository {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
    @InjectRepository(Clubs)
    private readonly clubRepository: Repository<Clubs>,
    @InjectRepository(ClubMembers)
    private readonly clubMembersRepository: Repository<ClubMembers>,
    @InjectRepository(EventPosts)
    private readonly eventpostRepository: Repository<EventPosts>,
    private jwtService: JwtService,
  ) {}

  // 작성글 조회
  // async getMyPosts(userId: number) {
  //   const clubPosts = await this.clubRepository.find({
  //     where: { userId },
  //     select: ["title", "content"],
  //   });
  //   const eventPosts = await this.eventpostRepository.find({
  //     where: { userId },
  //     select: ["title"],
  //   });
  //   return { clubPosts, eventPosts };
  // }

  // 회원정보 확인
  async getUsersInfo(userId: number) {
    return await this.userRepository.findOne({
      where: { userId },
      select: [
        "email",
        "password",
        "phone",
        "nickName",
        "snsURL",
        "userIMG",
        "createdAt",
      ],
    });
  }

  // 회원정보 수정
  async updateUser(userId: number, updateUserInfo: UserUpdateDto) {
    console.log(updateUserInfo);
    const changedInfo = await this.userRepository.update(userId, {
      email: updateUserInfo.email,
      password: updateUserInfo.password,
      phone: updateUserInfo.phone,
      nickName: updateUserInfo.nickName,
      snsURL: updateUserInfo.snsUrl,
      userIMG: updateUserInfo.userIMG,
    });
    return changedInfo;
    //
  }

  // 운영중인 모임 전체보기
  async getMyClubs(userId: number) {
    return await this.clubRepository.find({
      where: { userId },
      select: ["title", "content"],
      // 일단은 userId로 조회해서 같은 userId의 글을 가져오기
      // 결과보고, authorId로 조회해보는 방법 생각해보기
    });
  }

  // 신청서 전체보기
  async getClubApps(userId: number) {
    return await this.clubMembersRepository.find({
      where: { userId },
      select: ["isAccepted", "application"],
    });
  }

  // // 신청서 수락
  // async getThisMember(userId: number, clubMemberId) {}

  // // 신청서 거절
  // async rejectApps(userId: number) {}
}
