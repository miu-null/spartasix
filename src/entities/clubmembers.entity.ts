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

  @Column({ default: false })
  isAccepted: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date | null;

  @DeleteDateColumn()
  deletedAt: Date | null;
}
