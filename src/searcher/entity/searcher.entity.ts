import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Searcher {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    content: string;

    @Column()
    createdAt: Date;

}