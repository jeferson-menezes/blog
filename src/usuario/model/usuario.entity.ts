import { Column, Entity, PrimaryGeneratedColumn, AfterInsert } from 'typeorm';
import { Perfil } from './usuario.perfil';

@Entity()
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

    @AfterInsert()
    removeSenha() {
        console.log("Fui chamado com sucesso");
        this.senha = undefined
    }
}
