// import { Module } from '@nestjs/common';
// import { TypeOrmModule } from "@nestjs/typeorm";
// import { ClubController } from './club.controller';
// import { ClubService } from './club.service';
// import { Club } from "./club.entity";

<<<<<<< Updated upstream
// @Module({
//   imports: [TypeOrmModule.forFeature([Club])],
//   controllers: [ClubController],
//   providers: [ClubService],
// })
// export class BoardModule { }
=======
@Module({
  imports: [TypeOrmModule.forFeature([Club])],
  controllers: [ClubController],
  providers: [ClubService],
})
export class ClubModule { }
>>>>>>> Stashed changes
