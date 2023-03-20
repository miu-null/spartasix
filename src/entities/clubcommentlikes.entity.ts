import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { ClubComments } from "./clubcomments.entity";
import { Users } from "./users.entity";

@Entity({ schema: "ClubCommentLikes", name: "ClubCommentLikes" })
export class ClubCommentLikes {
  @PrimaryGeneratedColumn({ type: "int", name: "uuid" })
  id: number;

  @Column("int")
  userId: number;

  @Column("int")
  clubCommentId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date | null;

  @DeleteDateColumn()
  deletedAt: Date | null;

  @ManyToOne(() => Users, (user: Users) => user.clubCommentLikes)
  @JoinColumn({ name: "userId" })
  user: Users;

  @ManyToOne(
    () => ClubComments,
    (clubComments: ClubComments) => clubComments.clubCommentLikes,
  )
  @JoinColumn({ name: "clubCommentId" })
  clubComments: ClubComments;
}
