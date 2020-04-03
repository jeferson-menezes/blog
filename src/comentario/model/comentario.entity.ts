import { PostagemEntity } from 'src/postagem/model/postagem.entity';
import { UsuarioEntity } from 'src/usuario/model/usuario.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'comentario' })
export class ComentarioEntity {

    @PrimaryGeneratedColumn({ type: "bigint" })
    id: number;

    @Column({ type: "datetime", nullable: false })
    criadoEm: Date

    @Column({ type: "datetime", nullable: true })
    publicadoEm: Date

    @Column({ type: "boolean", nullable: false })
    publicado: boolean

    @Column({ type: "text", nullable: false })
    conteudo: string

    @ManyToOne(type => PostagemEntity, { nullable: false })
    postagem: PostagemEntity

    @ManyToOne(type => UsuarioEntity, { nullable: false })
    usuario: UsuarioEntity

    @ManyToOne(type => ComentarioEntity)
    parent: ComentarioEntity
}
