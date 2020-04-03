import { AfterInsert, Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Perfil } from './usuario.perfil';
import { LeituraEntity } from 'src/leitura/model/leitura.entity';

@Entity({ name: 'usuario' })
export class UsuarioEntity {

    @PrimaryGeneratedColumn({ type: "bigint" })
    id: number;

    @Column({ type: "varchar", nullable: false, length: 45 })
    nome: string;

    @Column({ type: "varchar", nullable: false, length: 50 })
    sobrenome: string;

    @Column({ type: "varchar", nullable: true, length: 15 })
    celular: string;

    @Column({ type: "varchar", nullable: false, length: 50 })
    email: string;

    @Column({ type: "text", nullable: false })
    senha: string;

    @Column({ type: "datetime", nullable: false })
    registradoEm: Date

    @Column({ type: "datetime", nullable: true, default: null })
    ultimoLogin: Date

    @Column({ type: 'enum', enum: Perfil, default: Perfil.USUARIO })
    perfil: Perfil

    @OneToMany(type => LeituraEntity, leitura => leitura.postagem)
    leituras: LeituraEntity[]

    @AfterInsert()
    removeSenha() {
        console.log("Fui chamado com sucesso");
        this.senha = undefined
    }
}
