import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Users } from "../user/entity/user.entity";
import { UserpageController } from "./userpage.controller";
import { UserpageService } from "./userpage.service";

@Module({
  imports: [TypeOrmModule.forFeature([Users])],
  controllers: [UserpageController],
  providers: [UserpageService],
})
export class UserpageModule {}
