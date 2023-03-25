import { Injectable } from "@nestjs/common";
import { getRepositoryToken, InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Users } from "../entities/users.entity";
import { Clubs } from "../entities/clubs.entity";
import { EventPosts } from "../entities/events.entity";
// import { JwtService } from "@nestjs/jwt";

@Injectable()
export class SearcherRepository {
  constructor(
    @InjectRepository(Users)
    private readonly userSearchRepository: Repository<Users>,
    @InjectRepository(Clubs)
    private readonly clubRepository: Repository<Clubs>,
    @InjectRepository(EventPosts)
    private readonly eventRepository: Repository<EventPosts>,
  ) { }
  //통합검색
  async findAllPosts(data: any): Promise<any> {
    {
      const clubs = await (await this.findClubPosts(data)).slice(0, 4)
      const events = await (await this.findEventPosts(data)).slice(0,4)
      const users = await (await this.findUsers(data)).slice(0,4)
      const results = {clubs, events, users}
      
      return results
    }
  }

  //event 게시글 검색 검색
  async findEventPosts(data?: any): Promise<EventPosts[]> {
    {
      const events = await this.eventRepository
        .createQueryBuilder('search')
        .leftJoinAndSelect('search.user', 'user')
        .where('search.title LIKE :s OR search.content LIKE :s', { s: `%${data.term}%` })
        .orderBy("search.id", "DESC")  //최신순(내림차순)
        .getMany()
      return events
    }
  }

  //clubs 게시글 검색: 제목, 내용, 모집인원
  async findClubPosts(data?: any): Promise<Clubs[]> {
    {
      const clubs = await this.clubRepository
        .createQueryBuilder("search")
        .leftJoinAndSelect("search.user", "user")
        .where(
          "search.title LIKE :s OR search.content LIKE :s OR search.maxMembers LIKE :s",
          { s: `%${data.term}%` },
        )
        .orderBy("search.id", "DESC") //최신순(내림차순)
        .getMany();
      return clubs;
    }
  }

  // 유저 검색, 이메일, 닉네임
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

  //게시글 통합 조회: 모든 게시글 통합 조회
  async getAllPosts(): Promise<(Clubs | EventPosts)[]> {
    const clubPosts = await this.clubRepository.find({relations : {user : true},})
    const eventPosts = await this.eventRepository.find({relations : {user : true},});
    const allPosts = [...clubPosts, ...eventPosts];   // 두 배열을 하나로 합치기

    return allPosts;
  }

  //통합 인기글 조회: 조회순 정렬 최상위 4개만
  async getPopularPosts(): Promise<(Clubs | EventPosts)[]> {
    const allPosts = await this.getAllPosts();
    const popularPosts = allPosts
      .sort((postA, postB) => postB.viewCount - postA.viewCount)
      .slice(0, 4); //최상위 4개만 가져옴
    return popularPosts;
  }

  //클럽 인기글 조회: 조회순 정렬 최상위 2개만
  async getPopularClubs(): Promise<Clubs[]> {
    const clubPosts = await (await this.clubRepository
      .find({relations : {user : true},}))
      .sort((postA, postB) => postB.viewCount - postA.viewCount)
      .slice(0, 2)
    const sortPosts = [...clubPosts];
    return sortPosts;
  }

  //이벤트 인기글 조회: 조회순 정렬 최상위 2개만
  async getPopularEvents(): Promise<EventPosts[]> {
    const sortPosts = await this.eventRepository
      .createQueryBuilder("sort")
      .leftJoinAndSelect("sort.user", "user")
      .orderBy("sort.viewCount", "DESC")
      .limit(2)
      .getMany();
    console.log(sortPosts, '리포지토리')
    return sortPosts;
  }

}
