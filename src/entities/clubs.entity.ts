import {
  Entity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  JoinColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
  ManyToOne,
} from "typeorm";
import { AbusingClubCounts } from "./abusingclubcounts.entity";
import { ClubComments } from "./clubcomments.entity";
import { ClubLikes } from "./clublikes.entity";
import { Users } from "./users.entity";

@Entity({ schema: "Clubs", name: "Clubs" })
export class Clubs {
  @PrimaryGeneratedColumn({ type: "int", name: "clubId" })
  id: number;

  @Column("int")
  userId: number;

  @Column("int")
  maxMembers: number;

  @Column("varchar", { length: 50 })
  title: string;

  @Column("varchar")
  content: string;

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

  // @ManyToMany(() => Users, (user) => user.clubs, {
  //   onUpdate: "CASCADE",
  //   onDelete: "CASCADE",
  // })
  // @JoinTable({ name: "userId" })
  // // @JoinColumn({ name: "userId" })
  // user: Users[];

  @ManyToOne(() => Users, (user: Users) => user.clubs, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
    eager: true,
  })
  user: Users;
}
