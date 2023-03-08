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

@Entity({ schema: "EventMembers", name: "EventMembers" })
export class EventMembers {
  @PrimaryGeneratedColumn({ type: "int", name: "eventMemberId" })
  eventMemberId: number;

  @Column("int")
  userId: number;

  @Column("int")
  eventPostId: number;

  @Column()
  notiDate: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date | null;

  @DeleteDateColumn()
  deletedAt: Date | null;

  @ManyToOne(() => Users, (user: Users) => user.eventMembers)
  @JoinColumn({ name: "userId" })
  user: Users;

  @ManyToOne(() => EventPosts, (eventPosts: EventPosts) => eventPosts.eventMembers)
  @JoinColumn({ name: "eventPostId" })
  eventPosts: EventPosts;
}
