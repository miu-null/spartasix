import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ClubController } from "./club.controller";
import { ClubService } from "./club.service";
import { Clubs } from "./entity/club.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Clubs])],
  controllers: [ClubController],
  providers: [ClubService],
})
// eslint-disable-next-line prettier/prettier
export class ClubModule {}
