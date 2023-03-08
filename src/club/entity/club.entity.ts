import {
  Entity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
} from "typeorm";
import { ClubMembers } from "../../userpage/entity/clubmembers.entity";
import { Users } from "../../user/entity/user.entity";
@Entity({ schema: "Clubs", name: "Clubs" })
export class Clubs {
  @PrimaryGeneratedColumn({ type: "int", name: "clubId" })
  clubId: number;

  @Column("int")
  authorId: number;

  // @Column("int")
  // userId: number;

  @Column("varchar", { length: 50 })
  title: string;

  @Column("varchar", { length: 1000 })
  content: string;

  @Column("int")
  maxMembers: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;

  // @ManyToOne((type) => Users, (user) => user.clubs)
  // user: Users;

  // @ManyToOne(() => ClubMembers, (clubMembers) => clubMembers.clubs)
  clubMembers: ClubMembers[]; // []이 끝에 붙어있으면 ClubMembers를 배열타입으로 정의함.
}
