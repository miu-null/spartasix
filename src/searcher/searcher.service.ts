import { Injectable } from '@nestjs/common';
import { CreateSearchDto } from './dto/create.search.dto';
import { SearcherRepository } from './searcher.repositoy';

@Injectable()
export class SearcherService {
    searchArticle(createSearchDto: CreateSearchDto) {
    throw new Error('Method not implemented.');
  }
    constructor(
        private SearcherRepository: SearcherRepository,
        ) {}  

    
    async findAllPosts(term : any) {;
        console.log(term, '서비스')
        const results = await this.SearcherRepository.findAllPosts(term);
        console.log(term, '리포리토지 통과')
        return results
    }

    async findEventPosts(term : any) {
        console.log(term, '서비스')
        const results = await this.SearcherRepository.findEventPosts(term);
        console.log(term, '리포리토지 통과')
        return results
    }

    async findClubPosts(term : any) {
        console.log(term, '서비스')
        const results = await this.SearcherRepository.findClubPosts(term);
        console.log(term, '리포리토지 통과')
        return results
    }

    async findUsers(term: any) {
        console.log(term, '서비스')
        const results = await this.SearcherRepository.findUsers(term);
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
        console.log('크리에이트 서비스', article, title);
        return await this.SearcherRepository.ArticleCreate(createSearchDto)
    }
}
