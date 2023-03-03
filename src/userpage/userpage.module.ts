import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Users } from "./users.entities";
import { UserpageController } from "./userpage.controller";
import { UserpageService } from "./userpage.service";

@Module({
  imports: [TypeOrmModule.forFeature([Users])],
  controllers: [UserpageController],
  providers: [UserpageService],
})
export class UserpageModule {}
