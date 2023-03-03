import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateSearchDto } from './CreateSearchDto';
import { Searcher } from './interface/searcher.interface';
import { SearcherService } from './searcher.service';

@Controller('search')
export class SearcherController {
    constructor(private searchService: SearcherService){};
    @Get()
    findAll() : Searcher[] {
        return this.searchService.findAll();
    }

    @Post()
    create(@Body() createSearchDto: CreateSearchDto){
        return this.searchService.create(createSearchDto);
    }

}

