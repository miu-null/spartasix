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

  //게시물, 유저 검색
  async findAllPosts(data: any): Promise<any> {
    {
      const clubs = await await this.findClubPosts(data);
      const events = await await this.findEventPosts(data);
      const users = await await this.findUsers(data);
      const results = { clubs, events, users };

      return results;
    }
  }

  //이벤트 게시물 검색
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

  //클럽 게시물 검색
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

  //유저 검색
  async findUsers(data?: any): Promise<Users[]> {
    {
      const users = await this.userSearchRepository
        .createQueryBuilder("search")
        .where("search.email LIKE :s OR search.nickName LIKE :s", {
          s: `%${data.term}%`,
        })
        .getMany();
      
        await this.getUserPosts()
      return users;
    }
  }

  //유저 작성 게시물 솟팅 : 최신순
  async getUserPosts(): Promise<(Clubs | EventPosts)[]> {
    const allPosts = await this.getAllPosts();
    const userPosts = allPosts
      .sort((postA, postB) => postB.id - postA.id)
      console.log('작성자',userPosts)
    return userPosts;
  }

  //모든 게시물 조회
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

  //모든 게시물 인기순 소팅
  async getPopularPosts(): Promise<(Clubs | EventPosts)[]> {
    const allPosts = await this.getAllPosts();
    const popularPosts = allPosts
      .sort((postA, postB) => postB.viewCount - postA.viewCount)
      .slice(0, 5);
    return popularPosts;
  }



  //클럽 게시물 인기순 정렬
  async getPopularClubs(): Promise<Clubs[]> {
    const clubPosts = await (
      await this.clubRepository.find({ relations: { user: true } })
    )
      .sort((postA, postB) => postB.viewCount - postA.viewCount)
      .slice(0, 3);

    const sortPosts = [...clubPosts];
    return sortPosts;
  }

  //이벤트 게시물 인기순 정렬
  async getPopularEvents(): Promise<EventPosts[]> {
    const sortPosts = await this.eventRepository
      .createQueryBuilder("sort")
      .leftJoinAndSelect("sort.user", "user")
      .orderBy("sort.viewCount", "DESC")
      .limit(3)
      .getMany();

    return sortPosts;
  }
  
  // 유저활동 순위 산정
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

    // 포인트 값에 따른 정렬
    const sortedUsers = usersPostCounts.sort((a, b) => b.point - a.point);
    
    // 정렬된 배열을 기반으로 순위 산정
    const usersRank = sortedUsers.map((usersRank, index) => ({
      user: usersRank.user,
      rank: index + 1,
      point : Math.ceil(usersRank.point*100)/100  //소숫점 1자리까지 표기
    }));
    return usersRank;
  }
}
