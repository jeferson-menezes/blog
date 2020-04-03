import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { PostagemEntity } from 'src/postagem/model/postagem.entity';

@Entity({ name: 'categoria' })
export class CategoriaEntity {

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

    @ManyToMany(type => PostagemEntity, postagem => postagem.categorias)
    postagens: PostagemEntity[];
}