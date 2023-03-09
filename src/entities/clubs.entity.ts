import {
  Entity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { AbusingClubCounts } from "./abusingclubcounts.entity";
import { ClubComments } from "./clubcomments.entity";
import { ClubLikes } from "./clublikes.entity";
import { ClubMembers } from "./clubmembers.entity";
import { Users } from "./users.entity";

@Entity({ schema: "Clubs", name: "Clubs" })
export class Clubs {
  @PrimaryGeneratedColumn({ type: "int", name: "clubId" })
  clubId: number;

  @Column("int")
  userId: number;

  @Column("int")
  maxMembers: number;

  @Column("varchar", { length: 50 })
  title: string;

  @Column("varchar")
  content: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;

  @OneToMany(() => ClubLikes, (clubLikes: ClubLikes) => clubLikes.clubs, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  })
  clubLikes: ClubLikes[];

  @OneToMany(() => ClubMembers, (clubMembers: ClubMembers) => clubMembers.clubs, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  })
  clubMembers: ClubMembers[];

  @OneToMany(() => ClubComments, (clubComments: ClubComments) => clubComments.clubs, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  })
  clubComments: ClubComments[];

  @OneToMany(() => AbusingClubCounts, (abusingClubCounts: AbusingClubCounts) => abusingClubCounts.clubs, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  })
  abusingClubCounts: AbusingClubCounts[];

  @ManyToOne(() => Users, (user: Users) => user.clubs)
  @JoinColumn({ name: "userId" })
  user: Users;
}
