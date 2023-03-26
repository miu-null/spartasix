import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ClubMembers } from "src/entities/clubmembers.entity";
import { Clubs } from "src/entities/clubs.entity";
import { Repository, MoreThan, LessThan } from "typeorm";
import { AbusingClubCounts } from "src/entities/abusingclubcounts.entity";

@Injectable()
export class ClubRepository {
  constructor(
    @InjectRepository(Clubs)
    private readonly clubRepository: Repository<Clubs>,
    @InjectRepository(ClubMembers)
    private clubmemberRepository: Repository<ClubMembers>,
    @InjectRepository(AbusingClubCounts)
    private abusingClubRepository: Repository<AbusingClubCounts>,
  ) {}

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
    await this.clubRepository.insert({
      userId,
      title,
      content,
      maxMembers,
      category,
    });

    return true;
  }

  async createApp(
    clubId: number,
    userId: number,
    application: string,
    isAccepted: boolean,
  ) {
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
}
