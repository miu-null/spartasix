import internal from "stream";
import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
  } from "typeorm";
  
  @Entity({ schema: "EventPosts", name: "EventPosts" })
  export class EventPosts {
    @PrimaryGeneratedColumn({ type: "int", name: "userId" })
    eventId: number;
  
    @Column("varchar", { length: 50 })
    title: string;
  
    @Column('text')
    content: string;
  
    @Column('date')
    date: Date;
  
    @Column({type:'int'})
    viewCount: number;
  
    @CreateDateColumn()
    createdateAt: Date | null;
  
    @UpdateDateColumn()
    updateAt: Date | null;
  }