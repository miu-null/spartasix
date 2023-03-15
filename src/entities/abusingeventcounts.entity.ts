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

@Entity({ schema: "AbusingEventCounts", name: "AbusingEventCounts" })
export class AbusingEventCounts {
  @PrimaryGeneratedColumn({ type: "int", name: "abusingEventCountId" })
  abusingEventCountId: number;

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

  @ManyToOne(() => Users, (user: Users) => user.abusingEventCounts)
  @JoinColumn({ name: "userId" })
  user: Users;

  @ManyToOne(
    () => EventPosts,
    (eventPosts: EventPosts) => eventPosts.abusingEventCounts,
  )
  @JoinColumn({ name: "eventPostId" })
  eventPosts: EventPosts;
}
