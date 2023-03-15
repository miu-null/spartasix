import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClubComments } from 'src/entities/clubcomments.entity';
import { ClubCommentController } from './clubcomment.controller';
import { ClubCommentRepository } from './clubcomment.repository';
import { ClubCommentService } from './clubcomment.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ClubComments]),
  ],
  controllers: [ClubCommentController],
  providers: [ClubCommentService,ClubCommentRepository]
})
export class ClubCommentModule {}
