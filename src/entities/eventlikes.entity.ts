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
import { EventPosts } from "./eventposts.entity";
import { Users } from "./users.entity";

@Entity({ schema: "EventLikes", name: "EventLikes" })
export class EventLikes {
  @PrimaryGeneratedColumn({ type: "int", name: "eventLikeId" })
  id: number;

  @Column("int")
  userId: number;

  @Column("int")
  eventPostId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date | null;

  @DeleteDateColumn()
  deletedAt: Date | null;

  @ManyToOne(() => Users, (user: Users) => user.eventLikes)
  @JoinColumn({ name: "userId" })
  user: Users;

  @ManyToOne(
    () => EventPosts,
    (eventPosts: EventPosts) => eventPosts.eventLikes,
  )
  @JoinColumn({ name: "eventPostId" })
  eventPosts: EventPosts;
}
