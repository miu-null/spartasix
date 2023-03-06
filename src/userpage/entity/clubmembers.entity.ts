import {
  BaseEntity,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
} from "typeorm";
import { Clubs } from "src/club/club.entity";

@Entity({ schema: "Users", name: "Users" })
export class ClubMembers {
  @PrimaryGeneratedColumn({ type: "int", name: "clubMemberId" })
  clubMemberId: number;

  @Column("int")
  clubId: number;

  @Column("int")
  userId: number;

  @Column("varchar", { length: 200 })
  application: string;

  @Column("boolean")
  isAccepted: boolean;

  @OneToMany(() => Clubs, (club) => club.clubMembers)
  clubs: Clubs[];
}
