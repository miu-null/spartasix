import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Users } from "../entities/users.entity";
import { Clubs } from "../entities/clubs.entity";
import { EventPosts } from "../entities/events.entity";

@Injectable()
export class SearcherRepository {
  constructor(
    @InjectRepository(Users)
    private readonly userSearchRepository: Repository<Users>,
    @InjectRepository(Clubs)
    private readonly clubRepository: Repository<Clubs>,
    @InjectRepository(EventPosts)
    private readonly eventRepository: Repository<EventPosts>,
  ) {}

  async findAllPosts(data: any): Promise<any> {
    {
      const clubs = await await this.findClubPosts(data);
      const events = await await this.findEventPosts(data);
      const users = await await this.findUsers(data);
      const results = { clubs, events, users };

      return results;
    }
  }

  async findEventPosts(data?: any): Promise<EventPosts[]> {
    {
      const events = await this.eventRepository
        .createQueryBuilder("search")
        .leftJoinAndSelect("search.user", "user")
        .where("search.title LIKE :s OR search.content LIKE :s OR user.nickName LIKE :s ", {
          s: `%${data.term}%`,
        })
        .orderBy("search.id", "DESC")
        .getMany();
      return events;
    }
  }

  async findClubPosts(data?: any): Promise<Clubs[]> {
    {
      const clubs = await this.clubRepository
        .createQueryBuilder("search")
        .leftJoinAndSelect("search.user", "user")
        .where(
          "search.title LIKE :s OR search.content LIKE :s OR search.maxMembers LIKE :s OR user.nickName LIKE :s",
          { s: `%${data.term}%` },
        )
        .orderBy("search.id", "DESC")
        .getMany();
      return clubs;
    }
  }

  async findUsers(data?: any): Promise<Users[]> {
    {
      const users = await this.userSearchRepository
        .createQueryBuilder("search")
        .where("search.email LIKE :s OR search.nickName LIKE :s", {
          s: `%${data.term}%`,
        })
        .getMany();
      return users;
    }
  }



  async getAllPosts(): Promise<(Clubs | EventPosts)[]> {
    const clubPosts = await this.clubRepository.find({
      relations: { user: true },
    });
    const eventPosts = await this.eventRepository.find({
      relations: { user: true },
    });
    const allPosts = [...clubPosts, ...eventPosts];

    return allPosts;
  }

  async getPopularPosts(): Promise<(Clubs | EventPosts)[]> {
    const allPosts = await this.getAllPosts();
    const popularPosts = allPosts
      .sort((postA, postB) => postB.viewCount - postA.viewCount)
      .slice(0, 5);
    return popularPosts;
  }

  async getPopularClubs(): Promise<Clubs[]> {
    const clubPosts = await (
      await this.clubRepository.find({ relations: { user: true } })
    )
      .sort((postA, postB) => postB.viewCount - postA.viewCount)
      .slice(0, 3);

    const sortPosts = [...clubPosts];
    return sortPosts;
  }

  async getPopularEvents(): Promise<EventPosts[]> {
    const sortPosts = await this.eventRepository
      .createQueryBuilder("sort")
      .leftJoinAndSelect("sort.user", "user")
      .orderBy("sort.viewCount", "DESC")
      .limit(3)
      .getMany();

    return sortPosts;
  }
  
  async getUserRank(): Promise<{ user: Users, rank: number }[]> {
    const allUsers = await this.userSearchRepository.find({relations: ["clubs", "eventPosts", "eventComments", "clubComments", "clubCommentLikes", "eventCommentLikes"]});
    const usersPostCounts = allUsers.map(user => ({
      user,
      point: 
      user.clubs.filter(club => !club.deletedAt).length 
      + user.eventPosts.filter(event => !event.deletedAt).length
      + user.eventComments.filter(eventComments => !eventComments.deletedAt).length
      + user.eventCommentLikes.filter(eventCommentLikes => !eventCommentLikes.deletedAt).length
      + user.clubComments.filter(clubComments => !clubComments.deletedAt).length
      + user.clubCommentLikes.filter(clubCommentLikes => !clubCommentLikes.deletedAt).length
      + user.eventPosts.reduce((acc, cur) => acc + cur.viewCount/10, 0)
      + user.clubs.reduce((acc, cur) => acc + cur.viewCount/10, 0)
    }));

    // 포인트 값에 따른 정렬 로직 구현
    const sortedUsers = usersPostCounts.sort((a, b) => b.point - a.point);
    
    // 정렬된 배열을 기반으로 순위 매기기
    const usersRank = sortedUsers.map((usersRank, index) => ({
      user: usersRank.user,
      rank: index + 1,
      point : usersRank.point
    }));
    return usersRank;
  }
}
