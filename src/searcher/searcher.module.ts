import { Module } from '@nestjs/common';
import { SearcherController } from './searcher.controller';
import { SearcherService } from './searcher.service';

@Module({
  controllers: [SearcherController],
  providers: [SearcherService]
})
export class SearcherModule {}
