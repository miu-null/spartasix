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
import { EventComments } from "./eventcomments.entity";
import { Users } from "./users.entity";

@Entity({ schema: "EventCommentLikes", name: "EventCommentLikes" })
export class EventCommentLikes {
  @PrimaryGeneratedColumn({ type: "int", name: "eventCommentLikeId" })
  eventCommentLikeId: number;

  @Column("int")
  userId: number;

  @Column("int")
  eventCommentId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date | null;

  @DeleteDateColumn()
  deletedAt: Date | null;

  @ManyToOne(() => Users, (user: Users) => user.eventCommentLikes)
  @JoinColumn({ name: "userId" })
  user: Users;

  @ManyToOne(
    () => EventComments,
    (eventComments: EventComments) => eventComments.eventCommentLikes,
  )
  @JoinColumn({ name: "eventCommentId" })
  eventComments: EventComments;
}
