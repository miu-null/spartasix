import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Clubs } from "src/entities/clubs.entity";
import { ClubController } from "./club.controller";
import { ClubService } from "./club.service";
import { Users } from "src/entities/users.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Clubs, Users])],
  // PassportModule.register({
  //   defaultStrategy: "jwt",
  // }),
  controllers: [ClubController],
  providers: [ClubService],
})
export class ClubModule { }
