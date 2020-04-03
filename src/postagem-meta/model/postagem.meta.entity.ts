import { PostagemEntity } from 'src/postagem/model/postagem.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'postagem-meta' })
export class PostagemMetaEntity {

    @PrimaryGeneratedColumn({ type: "bigint" })
    id: number;

    @Column({ type: "varchar", nullable: true, length: 50 })
    chave: string

    @Column({ type: "text", nullable: false })
    conteudo: string

    @ManyToOne(type => PostagemEntity, { nullable: false })
    postagem: PostagemEntity

}
