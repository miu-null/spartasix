import { Module } from '@nestjs/common';
import { SearcherController } from './searcher.controller';

@Module({
  controllers: [SearcherController]
})
export class SearcherModule {}
