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

@Entity({ schema: "ClubLikes", name: "ClubLikes" })
export class ClubLikes {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int")
  userId: number;

  @Column("int")
  clubId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date | null;

  @DeleteDateColumn()
  deletedAt: Date | null;

  @ManyToOne(() => Users, (user: Users) => user.clubLikes)
  @JoinColumn({ name: "userId" })
  user: Users;

  @ManyToOne(() => Clubs, (clubs: Clubs) => clubs.clubLikes)
  @JoinColumn({ name: "clubId" })
  clubs: Clubs;
}
