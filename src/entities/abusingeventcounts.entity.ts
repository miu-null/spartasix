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
import { EventPosts } from "./events.entity";
import { Users } from "./users.entity";

@Entity({ schema: "AbusingEventCounts", name: "AbusingEventCounts" })
export class AbusingEventCounts {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int")
  userId: number;

  @Column("int")
  eventPostId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date | null;

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
