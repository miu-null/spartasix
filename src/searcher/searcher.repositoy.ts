import { Injectable } from "@nestjs/common";
import { getRepositoryToken, InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateSearchDto } from "./dto/create.search.dto";
import { Searcher } from "../entities/searcher.entity";
import { Users } from "../entities/users.entity";
import { Clubs } from "../entities/clubs.entity";
import { EventPosts } from "../entities/eventposts.entity";
// import { JwtService } from "@nestjs/jwt";

@Injectable()
export class SearcherRepository {
  constructor(
    @InjectRepository(Searcher)
    private readonly searcherRepository: Repository<Searcher>,
    @InjectRepository(Users)
    private readonly userSearchRepository: Repository<Users>,
    @InjectRepository(Clubs)
    private readonly clubsSearchRepository: Repository<Clubs>,
    @InjectRepository(EventPosts)
    private readonly eventSearchRepository: Repository<EventPosts>,

  ) {}

  async findAllPosts(data: any): Promise<any> {  //테스트용 통합검색
    {
      console.log(`%${data.term}%`, data, "리포지토리 진입");
      const clubs = await this.clubsSearchRepository
        .createQueryBuilder('search')
        .where('search.title LIKE :s OR search.content LIKE :s', { s: `%${data.term}%` })
        .orderBy("search.clubId", "DESC")  //최신순(내림차순)
        .getMany();
      const events = await this.eventSearchRepository
        .createQueryBuilder('search')
        .where('search.title LIKE :s OR search.content LIKE :s', { s: `%${data.term}%` })
        .orderBy("search.eventPostId", "DESC")  //최신순(내림차순)
        .getMany();
      const results = {events, clubs}
      console.log(results);
      return results
    }
  }

  async findEventPosts(data: any): Promise<EventPosts[]> { //event 게시글 검색 검색
    {
      console.log(`%${data.term}%`, data, "리포지토리 진입");
      const results = await this.eventSearchRepository
        .createQueryBuilder('searchEvents')
        .where('searchEvents.title LIKE :s OR searchEvents.content LIKE :s', { s: `%${data.term}%` })
        .orderBy("search.id", "DESC")  //최신순(내림차순)
        .getMany();
      console.log(results);
      return results
    }
  }

  async findClubPosts(data: any) : Promise<Clubs[]> { //clubs 게시글 검색
    {
      console.log(`%${data.term}%`, data, "리포지토리 진입");
      const results = await this.clubsSearchRepository
        .createQueryBuilder('searchClubs')
        .where('searchClubs.title LIKE :s OR searchClubs.content LIKE :s', { s: `%${data.term}%` })
        .orderBy("search.id", "DESC")  //최신순(내림차순)
        .getMany();
      console.log(results, '리포지토리 통과');
      return results
    }
  }


  async findUsers(data: any) : Promise<Users[]>{
    {
      console.log(`%${data.term}%`, data, "리포지토리 진입");
      const results = await this.userSearchRepository
        .createQueryBuilder('searchUsers')
        .where('searchUsers.email LIKE :s OR searchUsers.nickName LIKE :s', { s: `%${data.term}%` })
        .getMany();
      console.log(results);
      return results
    }
  }

  async ArticleCreate(createSearchDto : CreateSearchDto) : Promise<Searcher> {
    console.log(createSearchDto, '리포지토리 진입')
    const {title, content} = createSearchDto
    const article = this.searcherRepository.create(createSearchDto)
    console.log('리포지토리 통과')

    await this.searcherRepository.save(article);
    return article
  }
}