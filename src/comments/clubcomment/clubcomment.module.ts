import { Module } from '@nestjs/common';
import { ClubcommentController } from './clubcomment.controller';
import { ClubcommentService } from './clubcomment.service';

@Module({
  controllers: [ClubcommentController],
  providers: [ClubcommentService]
})
export class ClubcommentModule {}
