import { Injectable } from "@nestjs/common";
import { getRepositoryToken, InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Users } from "../entities/users.entity";
import { Clubs } from "../entities/clubs.entity";
import { EventPosts } from "../entities/eventposts.entity";
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

  ) {}

  async findAllPosts(data: any): Promise<any> {  //통합검색
    {
      console.log(`%${data.term}%`, data, "리포지토리 진입");
      const clubs = await this.findClubPosts(data)
      const events = await this.findEventPosts(data)
      const users = await this.findUsers(data)
      const results = {events, clubs, users}
      console.log(results);
      return results
    }
  }

  async findEventPosts(data?: any): Promise<EventPosts[]>  { //event 게시글 검색 검색
    {
      console.log(`%${data.term}%`, data, "리포지토리 진입");
      const events= await this.eventRepository
      .createQueryBuilder('search')
      .leftJoinAndSelect('search.user', 'user')
      .where('search.title LIKE :s OR search.content LIKE :s', { s: `%${data.term}%` })
      .orderBy("search.id", "DESC")  //최신순(내림차순)
      .getMany()
      return events
    }
  }
  
  async findClubPosts(data?: any) : Promise<Clubs[]> { //clubs 게시글 검색
    {
      console.log(data, '리포지')
      const clubs = await this.clubRepository
        .createQueryBuilder('search')
        .leftJoinAndSelect('search.user', 'user')
        .where('search.title LIKE :s OR search.content LIKE :s', { s: `%${data.term}%` })
        .orderBy("search.id", "DESC")  //최신순(내림차순)
        .getMany()
      return clubs
    }
  }


  async findUsers(data?: any) : Promise<Users[]>{ // 유저 검색
    {
      console.log(`%${data.term}%`, data, "리포지토리 진입");
      const users = await this.userSearchRepository
        .createQueryBuilder('search')
        .where('search.email LIKE :s OR search.nickName LIKE :s', { s: `%${data.term}%` })
        .getMany()
      return users
    }
  }
}