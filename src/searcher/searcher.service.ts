import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateSearchDto } from './dto/create.search.dto';
import { Searcher} from './entity/searcher.entity';
import { SearcherRepository } from './searcher.repositoy';
import { IsUUID } from 'class-validator';


@Injectable()
export class SearcherService {
    constructor(private SearcherRepository: SearcherRepository) {}  

    findEventPosts(term : any) {
        console.log(term, '서비스')
        const results = this.SearcherRepository.findEventposts(term);
        console.log(term, '리포리토지 통과')
        return results
    }

    // findOne(id) : Promise<Searcher[]> {
    //     return this.SearcherRepository.find(id);
    // }

    async createArticle(createSearchDto:CreateSearchDto) {
        const {title, content} = createSearchDto
        const article = {
            title,
            content,
            createdAt : new Date(),
        }
        console.log('크리에이트, 서비스');
        return await this.SearcherRepository.ArticleCreate(createSearchDto)}

        
    //     await this.SearcherRepository.save(articles);
    //     return articles;
    // }

    // async remove(id: number) : Promise<void> {
    //     await this.SearcherRepository.delete(id);
    // }
}

// @Injectable()
// export class SearcherService {
//     constructor(
//         @InjectRepository(Searcher)
//         private SearchserRepository: Repository<Searcher>, //Searcher 라는 엔티티를 레파지토리로 사용할 수 있게 됨
//     ) {}

//     findAll() : Promise<Searcher[]> {
//         return this.SearchserRepository.find();
//     }



//     async remove(id: number) : Promise<void> {
//         await this.SearchserRepository.delete(id);
//     }

