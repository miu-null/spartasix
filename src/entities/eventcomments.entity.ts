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
import { EventCommentLikes } from "./eventcommentlikes.entity";
import { EventPosts } from "./eventposts.entity";
import { Users } from "./users.entity";

@Entity({ schema: "EventComments", name: "EventComments" })
export class EventComments {
  @PrimaryGeneratedColumn({ type: "int", name: "eventCommentId" })
  id: number;

  @Column("int")
  userId: number;

  @Column("int")
  eventPostId: number;

  @Column("varchar")
  content: string;

  @Column("int")
  class: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date | null;

  @DeleteDateColumn()
  deletedAt: Date | null;

  @OneToMany(
    () => EventCommentLikes,
    (eventCommentLikes: EventCommentLikes) => eventCommentLikes.eventComments,
    {
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
  )
  eventCommentLikes: EventCommentLikes[];

  @ManyToOne(() => Users, (user: Users) => user.eventComments)
  @JoinColumn({ name: "userId" })
  user: Users;

  @ManyToOne(
    () => EventPosts,
    (eventPosts: EventPosts) => eventPosts.eventComments,
  )
  @JoinColumn({ name: "eventPostId" })
  eventPosts: EventPosts;
}
