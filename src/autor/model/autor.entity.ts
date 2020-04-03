import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'autor' })
export class AutorEntity {

    @PrimaryGeneratedColumn({ type: "bigint" })
    id: number;

    @Column({ type: "varchar", nullable: false })
    nome: string

    @Column({ type: "text", nullable: true, })
    avatar: string

    @Column({ type: "text", nullable: true, })
    introducao: string

    @Column({ type: "text", nullable: false })
    perfil: string
}