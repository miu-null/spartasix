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
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int")
  userId: number;

  @Column("int")
  clubId: number;

  @Column("varchar", { length: 200 })
  application: string;

  @Column({ default: false })
  isAccepted: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date | null;

  @DeleteDateColumn()
  deletedAt: Date | null;

  @ManyToOne(() => Users, (user: Users) => user.clubMembers)
  @JoinColumn({ name: "userId" })
  user: Users;

  @ManyToOne(() => Clubs, (club: Clubs) => club.clubMembers)
  @JoinColumn({ name: "clubId" })
  club: Clubs;
}
