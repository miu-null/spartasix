import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity({ schema: "Users", name: "Users" })
export class Users {
  @PrimaryGeneratedColumn({ type: "int", name: "userId" })
  userId: number;

  @Column("varchar", { length: 50 })
  email: string;

  @Column("varchar", { length: 200 })
  password: string;

  @Column("varchar", { length: 10 })
  name: string;

  @Column("varchar", { length: 10 })
  nickName: string;

  @Column("varchar", { length: 11 })
  phone: string;

  @Column("varchar", { length: 50 })
  snsURL: string | null;

  @Column()
  userIMG: string | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date | null;

  @DeleteDateColumn()
  deletedAt: Date | null;
}
