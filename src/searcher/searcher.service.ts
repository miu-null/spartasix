import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateSearchDto } from './dto/create.search.dto';
import { Searcher} from '../entities/searcher.entity';
import { SearcherRepository } from './searcher.repositoy';
import { UserSearchRepository } from './searcher.repositoy';

@Injectable()
export class SearcherService {
    searchArticle(createSearchDto: CreateSearchDto) {
    throw new Error('Method not implemented.');
  }
    constructor(private SearcherRepository: SearcherRepository) {}  

    findEventPosts(term : any) {
        console.log(term, '서비스')
        const results = this.SearcherRepository.findEventposts(term);
        console.log(term, '리포리토지 통과')
        return results
    }


    async Articlecreate(createSearchDto:CreateSearchDto) {
        const {title, content} = createSearchDto
        const article = {
            title,
            content,
            createdAt : new Date(),
        }
        console.log('크리에이트, 서비스');
        return await this.SearcherRepository.ArticleCreate(createSearchDto)
    }
}


@Injectable()
export class UserSearchService {
  constructor(private userSearchRepository: UserSearchRepository) {}

findusers(term: any) {
    console.log(term, '서비스')
    const results = this.userSearchRepository.findusers(term);
    console.log(term, '리포리토지 통과')
    return results
}

}