import {
  BaseEntity,
  Entity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { Clubs } from "src/club/club.entity";

@Entity({ schema: "Users", name: "Users" })
export class Users extends BaseEntity {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column("varchar", { length: 50 })
  email: string;

  @Column("varchar", { length: 200 })
  password: string;

  @Column("varchar", { length: 10 })
  nickName: string;

  @Column("varchar", { length: 11 })
  phone: string;

  @Column("varchar", { length: 50 })
  snsURL: string | null;

  @Column()
  userIMG: string | null;

  @Column()
  type: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date | null;

  @DeleteDateColumn()
  deletedAt: Date | null;

  // 데이터베이스 관계설정
  // @OneToMany((type) => Clubs, (club) => club.user)
  // clubs: Clubs[];
}
