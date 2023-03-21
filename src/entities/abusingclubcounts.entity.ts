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
import { Clubs } from "./clubs.entity";
import { Users } from "./users.entity";

@Entity({ schema: "AbusingClubCounts", name: "AbusingClubCounts" })
export class AbusingClubCounts {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int")
  userId: number;

  @Column("int")
  clubId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date | null;

  @DeleteDateColumn()
  deletedAt: Date | null;

  @ManyToOne(() => Users, (user: Users) => user.abusingClubCounts)
  @JoinColumn({ name: "userId" })
  user: Users;

  @ManyToOne(() => Clubs, (clubs: Clubs) => clubs.abusingClubCounts)
  @JoinColumn({ name: "clubId" })
  clubs: Clubs;
}
