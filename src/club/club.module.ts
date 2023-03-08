import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Clubs } from "src/entities/clubs.entity";
import { ClubController } from "./club.controller";
import { ClubService } from "./club.service";

@Module({
  imports: [TypeOrmModule.forFeature([Clubs])],
  controllers: [ClubController],
  providers: [ClubService],
})
export class ClubModule {}
