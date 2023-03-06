import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
} from "@nestjs/common";
import { ClubService } from "./club.service";
import { CreateClubDto } from "./create-club.dto";
import { DeleteClubDto } from "./delete-club.dto";
import { UpdateClubDto } from "./update.club.dto";

@Controller('club')
export class ClubController {
    constructor(private readonly clubService: ClubService)

    @Get('/clubs')
    getClubs() {
        return await this.clubService.getClubs();
    }

    @Get('/clubs/:clubid')
    async getClubsById(@Param("clubid") clubId: number) {
        return await this.clubService.getClubsById(clubId)
    }

    @Post('/clubs')
    createClubs(@Body() data: CreateClubDto) {
        return this.clubService.createClubs(
            data.test,
            data.test,
        );
    }

    @Put('/clubs/:clubid')
    async updateClubs(
        @Param("clubid") clubId: number,
        @Body() data: UpdateClubDto
    ) {
        return this.clubService.updateClubs(
            clubId,
            data.test,
        );
    }

    @Delete('clubs/:clubid')
    async deleteClub(
        @Param("clubid") clubId: number,
        @Body() data: DeleteClubDto
    ) {
        return await this.clubService.deleteClub(clubId, data.test,);
    }
}
