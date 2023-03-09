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
import { AbusingEventCounts } from "./abusingeventcounts.entity";
import { EventComments } from "./eventcomments.entity";
import { EventLikes } from "./eventlikes.entity";
import { EventMembers } from "./eventmembers.entity";
import { Users } from "./users.entity";

@Entity({ schema: "EventPosts", name: "EventPosts" })
export class EventPosts {
  @PrimaryGeneratedColumn({ type: "int", name: "eventPostId" })
  eventPostId: number;

  @Column("int")
  userId: number;

  @Column("varchar", { length: 50 })
  title: string;

  @Column("varchar")
  content: string;

  @Column("date")
  date: Date;

  @Column("int")
  viewCount: number;

  @CreateDateColumn()
  createdateAt: Date;

  @UpdateDateColumn()
  updateAt: Date | null;

  @DeleteDateColumn()
  deletedAt: Date | null;

  @OneToMany(() => EventMembers, (eventMembers: EventMembers) => eventMembers.eventPosts, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  })
  eventMembers: EventMembers[];

  @OneToMany(() => EventLikes, (eventMembers: EventLikes) => eventMembers.eventPosts, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  })
  eventLikes: EventLikes[];

  @OneToMany(() => AbusingEventCounts, (eventMembers: AbusingEventCounts) => eventMembers.eventPosts, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  })
  abusingEventCounts: AbusingEventCounts[];

  @OneToMany(() => EventComments, (eventComments: EventComments) => eventComments.eventPosts, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  })
  eventComments: EventComments[];

  @ManyToOne(() => Users, (user: Users) => user.eventPosts)
  @JoinColumn({ name: "userId" })
  user: Users;
}
