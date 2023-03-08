import {
  Entity,
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
} from "typeorm";
import { ClubMembers } from "../userpage/entity/clubmembers.entity";
import { Users } from "../user/entity/user.entity";
@Entity({ schema: "Clubs", name: "Clubs" })
export class Clubs extends BaseEntity {
  @PrimaryGeneratedColumn()
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
  // clubMembers: ClubMembers;
}
