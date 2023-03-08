import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Clubs } from "./clubs.entity";
import { Users } from "./users.entity";

@Entity({ schema: "ClubMembers", name: "ClubMembers" })
export class ClubMembers {
  @PrimaryGeneratedColumn({ type: "int", name: "clubMemberId" })
  clubMemberId: number;

  @Column("int")
  userId: number;

  @Column("int")
  clubId: number;

  @Column("varchar", { length: 200 })
  application: string;

  @Column("boolean")
  isAccepted: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date | null;

  @DeleteDateColumn()
  deletedAt: Date | null;

  @ManyToOne(() => Users, (user: Users) => user.clubMembers)
  @JoinColumn({ name: "userId" })
  user: Users;

  @ManyToOne(() => Clubs, (clubs: Clubs) => clubs.clubMembers)
  @JoinColumn({ name: "clubId" })
  clubs: Clubs;
}
