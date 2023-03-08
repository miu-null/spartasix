import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Users } from "src/user/entity/user.entity";
import { Clubs } from "src/club/entity/club.entity";

@Injectable()
export class UserPageRepository {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
    private jwtService: JwtService,
  ) {}
}
