import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ClubMembers } from "src/entities/clubmembers.entity";
import { Clubs } from "src/entities/clubs.entity";
import { Repository, MoreThan, LessThan } from "typeorm";
import { AbusingClubCounts } from "src/entities/abusingclubcounts.entity";
import { concat } from "rxjs";

@Injectable()
export class ClubRepository {
  constructor(
    @InjectRepository(Clubs)
    private readonly clubRepository: Repository<Clubs>,
    @InjectRepository(ClubMembers)
    private clubmemberRepository: Repository<ClubMembers>,
    @InjectRepository(AbusingClubCounts)
    private abusingClubRepository: Repository<AbusingClubCounts>,
  ) { }

  async getClubs() {
    const data = await this.clubRepository.find({
      where: { deletedAt: null },
      relations: { user: true },
      select: [
        "id",
        "title",
        "maxMembers",
        "createdAt",
        "userId",
        "category",
        "viewCount",
      ],
      order: { id: "DESC" },
    });
    return data;
  }

  async createClub(
    userId: number,
    title: string,
    content: string,
    maxMembers: number,
    category: string,
  ) {
    const clubpost = await this.clubRepository.insert({
      userId,
      title,
      content,
      maxMembers,
      category,
    });
    
    const clubId = clubpost.identifiers[0].id; 
    await this.createApp(clubId, userId, '작성자 우선 참여', true);

    return true
  }

  async createApp(
    clubId: number,
    userId: number,
    application: string,
    isAccepted: boolean,
  ) {
    const clubwaitList = await this.clubmemberRepository
      .createQueryBuilder("members")
      .where("members.clubId = :clubId", { clubId })
      .andWhere("members.isAccepted = false")
      .getMany();
    const userInWaitlist = clubwaitList.find(
      (member) => member.userId === userId,
    );
    if (userInWaitlist) {
      throw new BadRequestException("중복 신청은 불가능합니다.");
    }
    const clubmembers = await this.clubmemberRepository
      .createQueryBuilder("members")
      .where("members.clubId = :clubId", { clubId })
      .andWhere("members.isAccepted = true")
      .getMany();
    const userInWaitlist2 = clubmembers.find(
      (member) => member.userId === userId,
    );
    if (userInWaitlist2) {
      throw new BadRequestException("이미 참가하고 있는 모임입니다.");
    }
    const article = await this.getClubById(clubId);

    if (userId === article.nowPost.userId) {
      throw new BadRequestException("본인 모임에는 신청할 수 없습니다.");
    }

    const data = await this.clubmemberRepository.insert({
      clubId,
      userId,
      application,
      isAccepted,
    });

    return data;
  }

  async updateClub(
    clubId: number,
    userId: number,
    title: string,
    content: string,
    maxMembers: number,
    category: string,
  ) {
    const article = await this.getClubById(clubId);
    if (!article) {
      throw new BadRequestException("게시글이 존재하지 않습니다.");
    }

    if (userId !== article.nowPost.userId) {
      throw new BadRequestException("작성자만 사용할 수 있는 기능입니다.");
    }
    const data = await this.clubRepository.update(clubId, {
      userId,
      title,
      content,
      maxMembers,
      category,
    });

    return data;
  }

  async getClubById(clubId: number) {
    const nowPost = await this.clubRepository.findOne({
      where: { id: clubId, deletedAt: null },
      relations: { user: true },
    });

    const prevPost = await this.clubRepository.findOne({
      where: { id: LessThan(clubId) },
      relations: { user: true },
      order: { id: "DESC" },
    });
    const nextPost = await this.clubRepository.findOne({
      where: { id: MoreThan(clubId) },
      relations: { user: true },
      order: { id: "ASC" },
    });
    await this.clubRepository
      .createQueryBuilder()
      .update(Clubs)
      .set({ viewCount: () => "viewCount + 1" })
      .where("id = :id", { id: clubId })
      .execute();
    return { prevPost, nowPost, nextPost };
  }

  // 클럽 멤버 정보 (운영자, 참여인원 보여주기)
  async getClubMember(clubId: number) {
    const clubmembers = await this.clubmemberRepository
      .createQueryBuilder("members")
      .select(["members.id", "members.userId", "members.updatedAt", "members.isAccepted", "u.nickName", "u.userIMG", "c.maxMembers"])
      .leftJoin("Users", "u", "u.id = members.userId")
      .leftJoin("Clubs", "c", "c.id = members.clubId")
      .where("members.clubId = :clubId", { clubId })
      .andWhere("members.isAccepted = true")
      .getRawMany();

    const clubwaitList = await this.clubmemberRepository
      .createQueryBuilder("members")
      .select(["members.id", "members.userId", "members.createdAt", "members.isAccepted", "u.nickName", "u.userIMG"])
      .leftJoin("Users", "u", "u.id = members.userId")
      .where("members.clubId = :clubId", { clubId })
      .andWhere("members.isAccepted = false")
      .getRawMany();

    const clubMembers = [].concat(clubmembers)
    const clubWaitList = [].concat(clubwaitList)
    return { clubMembers, clubWaitList };
  }

  async deleteClubDto(userId: number, clubId: number) {
    const article = await this.getClubById(clubId);

    if (!article) {
      throw new BadRequestException("게시글이 존재하지 않습니다.");
    }

    if (userId !== article.nowPost.userId) {
      throw new BadRequestException("작성자만 사용할 수 있는 기능입니다.");
    }

    await this.clubRepository.softDelete(clubId);
  }
  async reportClub(
    clubId: number,
    userId: number,
    reportReason: string,
    reportContent: string,
  ) {
    const data = await this.abusingClubRepository.insert({
      clubId,
      userId,
      reportReason,
      reportContent,
    });

    return data;
  }
}
