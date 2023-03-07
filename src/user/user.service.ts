import { Injectable } from "@nestjs/common";
import { UserRepository } from "./user.repository";

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async createUser(
    email: string,
    password: string,
    name: string,
    nickName: string,
    phone: string,
  ) {
    await this.userRepository.createUser(
      email,
      password,
      name,
      nickName,
      phone,
    );
  }

  async login(email: string, password: string) {
    return this.userRepository.login(email, password);
  }
}
