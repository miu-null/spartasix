import { Module } from '@nestjs/common';
import { EventcommentController } from './eventcomment.controller';
import { EventcommentService } from './eventcomment.service';

@Module({
  controllers: [EventcommentController],
  providers: [EventcommentService]
})
export class EventcommentModule {}
