import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Searcher} from './entity/searcher.entity';

@Injectable()
export class SearcherService {
    constructor(
        @InjectRepository(Searcher)
        private SearchserRepository: Repository<Searcher>, //Searcher 라는 엔티티를 레파지토리로 사용할 수 있게 됨
    ) {}

    findAll() : Promise<Searcher[]> {
        return this.SearchserRepository.find();
    }

    async create(search : Searcher) : Promise<void> {
        await this.SearchserRepository.save(search);
    }

    async remove(id: number) : Promise<void> {
        await this.SearchserRepository.delete(id);
    }
}
