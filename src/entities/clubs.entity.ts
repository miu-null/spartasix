import {
  Entity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  ManyToMany,
  JoinColumn,
} from "typeorm";
import { AbusingClubCounts } from "./abusingclubcounts.entity";
import { ClubComments } from "./clubcomments.entity";
import { ClubLikes } from "./clublikes.entity";
import { ClubMembers } from "./clubmembers.entity";
import { Users } from "./users.entity";

@Entity({ schema: "Clubs", name: "Clubs" })
export class Clubs {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int")
  userId: number;

  @Column("int")
  maxMembers: number;

  @Column("varchar", { length: 50 })
  title: string;

  @Column("varchar")
  content: string;

  // @Column("int", {default:0}) //default 값을 0으로 설정하여 조회수 초기화
  @Column("int")
  viewCount: number;

  @Column("varchar")
  category: string;

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

  @OneToMany(
    () => ClubComments,
    (clubComments: ClubComments) => clubComments.clubs,
    {
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
  )
  clubComments: ClubComments[];

  @OneToMany(
    () => AbusingClubCounts,
    (abusingClubCounts: AbusingClubCounts) => abusingClubCounts.clubs,
    {
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
  )
  abusingClubCounts: AbusingClubCounts[];

  // @ManyToOne(() => Users, (user: Users) => user.clubs, {
  //   onUpdate: "CASCADE",
  //   onDelete: "CASCADE",
  //   // eager: true,
  // })
  // @JoinColumn({ name: "userId", referencedColumnName: "id" })
  // user: Users;

  @ManyToMany(() => Users, (users: Users) => users.clubs, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  })
  user: Users[];

  @OneToMany(
    () => ClubMembers,
    (clubMembers: ClubMembers) => clubMembers.club,
    {
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
  )
  clubMembers: ClubMembers[];
}
