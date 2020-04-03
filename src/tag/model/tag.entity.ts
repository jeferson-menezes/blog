import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'tag' })
export class TagEntity {

    @PrimaryGeneratedColumn({ type: "bigint" })
    id: number;

    @Column({ type: "varchar", nullable: true, length: 45 })
    titulo: string

    @Column({ type: "varchar", nullable: true, length: 45 })
    metaTitulo: string

    @Column({ type: "varchar", nullable: true, length: 45 })
    slug: string

    @Column({ type: "varchar", nullable: false, length: 45 })
    conteudo: string
}