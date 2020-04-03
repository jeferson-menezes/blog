import { AutorEntity } from 'src/autor/model/autor.entity';
import { CategoriaEntity } from 'src/categoria/model/categoria.entity';
import { TagEntity } from 'src/tag/model/tag.entity';
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { LeituraEntity } from 'src/leitura/model/leitura.entity';

@Entity({ name: 'postagem' })
export class PostagemEntity {

    @PrimaryGeneratedColumn({ type: "bigint" })
    id: number;

    @Column({ type: "varchar", nullable: false, length: 75 })
    titulo: string;

    @Column({ type: "varchar", nullable: true, length: 100 })
    metaTitulo: string;

    @Column({ type: "varchar", nullable: true, length: 100 })
    slug: string;

    @Column({ type: "text", nullable: false })
    sumario: string;

    @Column({ type: "boolean", nullable: false })
    publicado: boolean;

    @Column({ type: "datetime", nullable: false })
    criadoEm: Date

    @Column({ type: "datetime", nullable: true, default: null })
    alteradoEm: Date

    @Column({ type: "datetime", nullable: true, default: null })
    publicadoEm: Date

    @Column({ type: "text", nullable: false })
    conteudo: string;

    @ManyToOne(type => AutorEntity, { nullable: false })
    autor: AutorEntity

    @ManyToOne(type => PostagemEntity)
    parent: PostagemEntity

    @ManyToMany(type => CategoriaEntity, categoria => categoria.postagens,
        { cascade: true })
    @JoinTable({name:'postagem_categorias'})
    categorias: CategoriaEntity[];

    @ManyToMany(type => TagEntity, { cascade: true })
    @JoinTable({name:'postagem_tags'})
    tags: TagEntity[]

    @OneToMany(type => LeituraEntity, leitura => leitura.postagem)
    leituras: LeituraEntity[]
}