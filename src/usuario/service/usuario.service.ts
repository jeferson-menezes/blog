import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Crypt } from '../model/usuario.crypt';
import { UsuarioEntity } from '../model/usuario.entity';

@Injectable()
export class UsuarioService {

    constructor(@InjectRepository(UsuarioEntity)
    private usuarioRepository: Repository<UsuarioEntity>) { }

    async save(usuario: UsuarioEntity): Promise<UsuarioEntity> {

        usuario.registradoEm = new Date()

        usuario.senha = await Crypt.encript(usuario.senha);

        return this.usuarioRepository.save(usuario);
    }

    findAll(): Promise<UsuarioEntity[]> {
        return this.usuarioRepository.find();
    }

    findOne(id: string): Promise<UsuarioEntity> {
        return this.usuarioRepository.findOne(id);
    }

    async remove(id: string): Promise<void> {
        await this.usuarioRepository.delete(id);
    }

    async findByEmail(email: string): Promise<UsuarioEntity> {
        const usuarios = await this.usuarioRepository.find({ where: { email: email } });
        return usuarios[0];
    }


}