import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { ClubCommentLikes } from "./clubcommentlikes.entity";
import { Clubs } from "./clubs.entity";
import { ClubSecondComments } from "./clubsecondcomments.entity";
import { Users } from "./users.entity";

@Entity({ schema: "ClubComments", name: "ClubComments" })
export class ClubComments {
  @PrimaryGeneratedColumn({ type: "int", name: "clubCommentId" })
  clubCommentId: number;

  @Column("int")
  userId: number;

  @Column("int")
  clubId: number;

  @Column("varchar")
  content: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date | null;

  @DeleteDateColumn()
  deletedAt: Date | null;

  @OneToMany(() => ClubCommentLikes, (clubCommentLikes: ClubCommentLikes) => clubCommentLikes.clubComments, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  })
  clubCommentLikes: ClubCommentLikes[];

  @OneToMany(() => ClubSecondComments, (clubSecondComments: ClubSecondComments) => clubSecondComments.clubComments, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  })
  clubSecondComments: ClubSecondComments[];

  @ManyToOne(() => Users, (user: Users) => user.clubComments)
  @JoinColumn({ name: "userId" })
  user: Users;

  @ManyToOne(() => Clubs, (clubs: Clubs) => clubs.clubComments)
  @JoinColumn({ name: "clubId" })
  clubs: Clubs;
}
