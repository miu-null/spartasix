import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Users } from "./entity/user.entity";

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
  ) {}

  async createUser(
    email: string,
    password: string,
    name: string,
    nickName: string,
    phone: string,
  ) {
    this.userRepository.insert({
      email,
      password,
      name,
      nickName,
      phone,
      type: "user",
    });
  }

  async login(email: string, password: string) {}
}
