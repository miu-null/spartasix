import {
  Body,
  Controller,
  // Delete,
  Get,
  Param,
  Post,
  // Put,
} from "@nestjs/common";
import { ClubService } from "./club.service";
import { CreateClubDto } from "./dto/create-club.dto";
// import { DeleteClubDto } from "./dto/delete-club.dto";
// import { UpdateClubDto } from "./dto/update-club.dto";

@Controller("club")
export class ClubController {
  // eslint-disable-next-line prettier/prettier
  constructor(private readonly clubService: ClubService) {}

  @Get("/clubs")
  async getClubs() {
    return await this.clubService.getClubs();
  }

  @Get("/clubs/:clubid")
  async getClubsById(@Param("clubid") clubId: number) {
    return await this.clubService.getClubById(clubId);
  }

  @Post("/clubs")
  createClubs(@Body() data: CreateClubDto) {
    // data. 수정 필요 컬럼명에 맞게.
    return this.clubService.createClub(
      data.title,
      data.content,
      data.maxMembers,
    );
  }
}
// 자신이 쓴 글을 수정,삭제 기능 -> Users 테이블에서 어떻게 비교?
//   @Put("/clubs/:clubid")
//   async updateClubs(
//     @Param("clubid") clubId: number,
//     @Body() data: UpdateClubDto,
//   ) {
//     // 수정필요 위와 동일
//     return this.clubService.updateClub(
//       clubId,
//       data.title,
//       data.content,
//       data.maxMembers,
//     );
//   }

//   @Delete("clubs/:clubid")
//   async deleteClub(
//     @Param("clubid") clubId: number,
//     @Body() data: DeleteClubDto,
//   ) {
//     // 수정필요 위와 동일
//     return await this.clubService.deleteClub(clubId, data.);
//   }
// }
