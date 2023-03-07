import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateSearchDto } from './dto/create.search.dto';
import { Searcher} from './entity/searcher.entity';
import { SearcherRepository } from './searcher.repositoy';


@Injectable()
export class SearcherService {
    constructor(
        @InjectRepository(SearcherRepository)
        private SearcherRepository: SearcherRepository,
    ) {}  //리포지토리를 서비스에 inject넣어줌 

    findEventPosts(term : any) : Promise<Searcher[]> {
        console.log(term, '서비스')
        const results = this.SearcherRepository.find(term);
        return results
    }

    findOne(id) : Promise<Searcher[]> {
        return this.SearcherRepository.find(id);
    }

    async create(createSearchDto : CreateSearchDto ) : Promise<Searcher> {
        const { name, age   } = createSearchDto;
        console.log('서비스');
        const articles = await this.SearcherRepository.create({
            name, age
        })
        
        await this.SearcherRepository.save(articles);
        
        return articles;
    }

    async remove(id: number) : Promise<void> {
        await this.SearcherRepository.delete(id);
    }
}
