// import {
//   Injectable,
//   NotFoundException,
//   UnauthorizedException,
// } from "@nestjs/common";
// import { InjectRepository } from "@nestjs/typeorm";
// import _ from "lodash";
// import { Repository } from "typeorm";
// import { Users } from "./users.entities";
// import { Clubs } from "./clubs.entities";
// import { UserUpdateDto } from "./userpage.update.dto";

// @Injectable()
// export class UserpageService {
//   constructor(
//     @InjectRepository(Users) private userRepository: Repository<Users>,
//     private clubRepository: Repository<Clubs>,
//   ) {}

//   async getMyPosts(userId: number) {
//     // 회원이 쓴 글 조회
//     return await this.userRepository.findOne({
//       where: { userId },
//       select: ["title", "content"],
//     });
//   }
//   async updateUser(userId: number, updateUserInfo: UserUpdateDto) {
//     await this.userRepository.update(userId, { updateUserInfo });
//   } // 회원정보 수정

//   async getMyclubs(userId: number) {
//     return await this.clubRepository.findOne({
//       where: { userId },
//       select: ["title", "content"],
//     });
//   } //운영중인 모임 전체 보기
//   async getClubApps(userId: number) {
//     return await this.clubRepository.find({
//       where: { userId },
//       select: ["title", "content"],
//     });
//   }
// }
