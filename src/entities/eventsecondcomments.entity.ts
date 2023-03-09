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

@Entity({ schema: "EventSecondComments", name: "EventSecondComments" })
export class EventSecondComments {
  @PrimaryGeneratedColumn({ type: "int", name: "eventSecondCommentId" })
  eventSecondCommentId: number;

  @Column("int")
  userId: number;

  @Column("int")
  eventCommentId: number;

  @Column("varchar")
  content: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date | null;

  @DeleteDateColumn()
  deletedAt: Date | null;

  @ManyToOne(() => Users, (user: Users) => user.eventSecondComments)
  @JoinColumn({ name: "userId" })
  user: Users;

  @ManyToOne(() => EventComments, (user: EventComments) => user.eventSecondComments)
  @JoinColumn({ name: "eventCommentId" })
  eventComments: EventComments;
}
