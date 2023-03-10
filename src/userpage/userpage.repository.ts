import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { ClubMembers } from "../entities/clubmembers.entity";
import { Clubs } from "../entities/clubs.entity";
import { EventPosts } from "../entities/eventposts.entity";
import { Users } from "../entities/users.entity";
import { Repository } from "typeorm";
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
  async getUserInfo(userId: number) {
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

  // 클럽 신청서 전체보기
  async getClubApps(userId: number) {
    const members = await this.clubMembersRepository
      .createQueryBuilder("members")
      .where("members.userId = :userId", { userId, deletedAt: null })
      // .andWhere("members.clubMemberId = :clubMemberId", { clubMemberId })
      .getMany();
    return members;

    //   where: { userId },
    //   select: ["isAccepted", "application"],
    // });
  }

  // 특정 신청서 조회
  async getThisApp(userId: number, clubMemberId: number) {
    const members = await this.clubMembersRepository
      .createQueryBuilder("members")
      .where("members.userId = :userId", { userId, deletedAt: null })
      .andWhere("members.clubMemberId = :clubMemberId", { clubMemberId })
      .getOne();
    return members;
  }

  // 신청서 수락
  async getThisMember(userId: number, clubMemberId: number) {
    const thisApp = await this.getThisApp(userId, clubMemberId);
    if (thisApp) {
      thisApp.isAccepted = true;
      await this.clubMembersRepository.save(thisApp);
    }
  }

  // 신청서 거절
  async rejectApp(userId: number, clubMemberId: number) {
    await this.clubMembersRepository
      .createQueryBuilder("apps")
      .softDelete()
      .where("apps.userId = :userId", { userId })
      .andWhere("apps.clubMemberId = :clubMemberId", { clubMemberId })
      .execute();
  }
}
