import { Controller, Get } from '@nestjs/common';

@Controller('searcher')
export class SearcherController {
    @Get()
    findAll() : string {
        return 'This action returns all results'
    }
}

