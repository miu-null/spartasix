import {
  Entity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToMany,
} from "typeorm";
import { AbusingClubCounts } from "./abusingclubcounts.entity";
import { AbusingEventCounts } from "./abusingeventcounts.entity";
import { ClubCommentLikes } from "./clubcommentlikes.entity";
import { ClubComments } from "./clubcomments.entity";
import { ClubLikes } from "./clublikes.entity";
import { Clubs } from "./clubs.entity";
import { EventComments } from "./eventcomments.entity";
import { EventCommentLikes } from "./eventcommentlikes.entity";
import { EventLikes } from "./eventlikes.entity";
import { EventMembers } from "./eventmembers.entity";
import { EventPosts } from "./eventposts.entity";

@Entity({ schema: "Users", name: "Users" })
export class Users {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { length: 50 })
  email: string;

  @Column("varchar")
  password: string;

  @Column("varchar", { length: 10 })
  nickName: string;

  @Column("varchar", { length: 11 })
  phone: string;

  @Column("varchar", { length: 50 })
  snsURL: string | null;

  @Column()
  userIMG: string | null;

  @Column("varchar")
  type: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date | null;

  @DeleteDateColumn()
  deletedAt: Date | null;

  // @ManyToMany(() => Clubs, (clubs) => clubs.user, {
  //   onUpdate: "CASCADE",
  //   onDelete: "CASCADE",
  // })
  // clubs: Clubs[];

  @OneToMany(() => Clubs, (clubs) => clubs.user, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
    eager: false,
  })
  clubs: Clubs[];

  @OneToMany(
    () => AbusingClubCounts,
    (abusingClubCounts: AbusingClubCounts) => abusingClubCounts.user,
    {
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
  )
  abusingClubCounts: AbusingClubCounts[];

  @OneToMany(() => EventPosts, (eventPosts: EventPosts) => eventPosts.user, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  })
  eventPosts: EventPosts[];

  @OneToMany(
    () => AbusingEventCounts,
    (abusingEventCounts: AbusingEventCounts) => abusingEventCounts.user,
    {
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
  )
  abusingEventCounts: AbusingEventCounts[];

  @OneToMany(
    () => EventMembers,
    (eventMembers: EventMembers) => eventMembers.user,
    {
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
  )
  eventMembers: EventMembers[];

  @OneToMany(() => EventLikes, (eventLikes: EventLikes) => eventLikes.user, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  })
  eventLikes: EventLikes[];

  @OneToMany(
    () => EventCommentLikes,
    (eventCommentLikes: EventCommentLikes) => eventCommentLikes.user,
    {
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
  )
  eventCommentLikes: EventCommentLikes[];

  @OneToMany(
    () => EventComments,
    (eventComments: EventComments) => eventComments.user,
    {
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
  )
  eventComments: EventComments[];

  @OneToMany(() => ClubLikes, (clubLikes: ClubLikes) => clubLikes.user, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  })
  clubLikes: ClubLikes[];

  @OneToMany(
    () => ClubComments,
    (clubComments: ClubComments) => clubComments.user,
    {
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
  )
  clubComments: ClubComments[];

  @OneToMany(
    () => ClubCommentLikes,
    (clubCommentLikes: ClubCommentLikes) => clubCommentLikes.user,
    {
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
  )
  clubCommentLikes: ClubCommentLikes[];
}
