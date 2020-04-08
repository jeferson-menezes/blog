import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Crypt } from '../../shared/seguranca/usuario.crypt';
import { UsuarioEntity } from '../model/usuario.entity';
import { Mensagem } from 'src/shared/model/mensagem';
import { Paginacao } from 'src/shared/model/paginacao';

@Injectable()
export class UsuarioService {

    constructor(@InjectRepository(UsuarioEntity)
    private usuarioRepository: Repository<UsuarioEntity>) { }

    async save(usuario: UsuarioEntity): Promise<UsuarioEntity> {

        const registrado = await this.findByEmail(usuario.email)

        if (registrado) return Promise.reject(new Mensagem('E-mail já cadastrado'))

        usuario.registradoEm = new Date()

        usuario.senha = await Crypt.encript(usuario.senha);

        await this.usuarioRepository.save(usuario);
        usuario.senha = undefined
        return Promise.resolve(usuario);
    }

    async listarPaginado(size: number, page: number): Promise<Paginacao> {
        const offset = page * size
        const resultados = await this.usuarioRepository
            .createQueryBuilder('user')
            .skip(offset)
            .take(size)
            .getMany()

        const total = await this.usuarioRepository
            .createQueryBuilder('user')
            .getCount()

        const totalPages = Math.ceil(total / size)

        const paginacao = new Paginacao(size, page, total, totalPages, resultados)
        return Promise.resolve(paginacao)
    }

    detalhar(id: string): Promise<UsuarioEntity> {
        return this.usuarioRepository.findOne(id);
    }

    async remove(id: string): Promise<void> {
        await this.usuarioRepository.delete(id);
    }

    async findByEmail(email: string): Promise<UsuarioEntity> {
        return await this.usuarioRepository.findOne({ where: { email: email, } });
    }


}