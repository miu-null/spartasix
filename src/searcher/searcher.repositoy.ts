import { Injectable } from "@nestjs/common";
import { getRepositoryToken, InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Searcher } from "../entities/searcher.entity";
import { CreateSearchDto } from "./dto/create.search.dto";
import { Users } from "../entities/users.entity";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class SearcherRepository {
  constructor(
    @InjectRepository(Searcher)
    private readonly searcherRepository: Repository<Searcher>
  ) {}


  async findEventposts(data: any): Promise<Searcher[]> {
    {
      console.log(`%${data.term}%`, data, "리포지토리 진입");
      const results = await this.searcherRepository
        .createQueryBuilder('search')
        .where('search.title LIKE :s OR search.content LIKE :s', { s: `%${data.term}%` })
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

@Injectable()
export class UserSearchRepository {
  constructor(
    @InjectRepository(Users)
    private readonly userSearchRepository: Repository<Users>,
    private jwtService: JwtService,
  ) {}

  async findusers(data: any) {
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

}