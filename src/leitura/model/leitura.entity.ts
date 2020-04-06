import { PostagemEntity } from 'src/postagem/model/postagem.entity';
import { UsuarioEntity } from 'src/usuario/model/usuario.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({name:'leitura'})
export class LeituraEntity {

    @PrimaryGeneratedColumn({ type: "bigint" })
    id: number;

    @Column({ type: "double" })
    tempo: number;

    @Column({ type: "datetime", nullable: true })
    data: Date

    @ManyToOne(type => UsuarioEntity, usuario => usuario.leituras)
    usuario: UsuarioEntity

    @ManyToOne(type => PostagemEntity, postagem => postagem.leituras, { nullable: false })
    postagem: PostagemEntity
}