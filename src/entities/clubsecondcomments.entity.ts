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

@Entity({ schema: "ClubSecondComments", name: "ClubSecondComments" })
export class ClubSecondComments {
  @PrimaryGeneratedColumn({ type: "int", name: "clubSecondCommentId" })
  clubSecondCommentId: number;

  @Column("int")
  userId: number;

  @Column("int")
  clubCommentId: number;

  @Column("varchar")
  content: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date | null;

  @DeleteDateColumn()
  deletedAt: Date | null;

  @ManyToOne(() => Users, (user: Users) => user.clubSecondComments)
  @JoinColumn({ name: "userId" })
  user: Users;

  @ManyToOne(
    () => ClubComments,
    (clubComments: ClubComments) => clubComments.clubSecondComments,
  )
  @JoinColumn({ name: "clubCommentId" })
  clubComments: ClubComments;
}
