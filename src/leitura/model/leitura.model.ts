import { PostagemEntity } from 'src/postagem/model/postagem.entity';
import { UsuarioEntity } from 'src/usuario/model/usuario.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class LeituraEntity {

    // @PrimaryGeneratedColumn({ type: "bigint" })
    // id: number;

    @Column({ type: "double", precision: 2, default: 0 })
    tempo: number;

    @ManyToOne(type => UsuarioEntity)
    usuario: UsuarioEntity

    @ManyToOne(type => PostagemEntity, postagem => postagem.leituras)
    postagem: PostagemEntity
}