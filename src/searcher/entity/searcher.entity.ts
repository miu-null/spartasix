import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Searcher {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    age: number;
}