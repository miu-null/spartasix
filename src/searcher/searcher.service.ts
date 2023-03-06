import { Injectable } from '@nestjs/common';
import { Searcher } from './interface/searcher.interface';

@Injectable()
export class SearcherService {
    private readonly searcher: Searcher[] = [];

    create(search : Searcher) {
        this.searcher.push(search);
    }

    findAll() : Searcher[] {
        return this.searcher;
    }
}
