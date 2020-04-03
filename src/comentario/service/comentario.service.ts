import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostagemEntity } from 'src/postagem/model/postagem.entity';
import { UsuarioEntity } from 'src/usuario/model/usuario.entity';
import { Repository, UpdateResult } from 'typeorm';
import { ComentarioEntity } from '../model/comentario.entity';
import { ComentarioForm } from '../model/comentario.form';

@Injectable()
export class ComentarioService {

    constructor(@InjectRepository(ComentarioEntity) private comentarioRepository: Repository<ComentarioEntity>,
        @InjectRepository(PostagemEntity) private postagemRepository: Repository<PostagemEntity>,
        @InjectRepository(UsuarioEntity) private usuarioRepository: Repository<UsuarioEntity>) { }


    async adicionar(form: ComentarioForm): Promise<any> {

        try {
            const comentario = this.populaNovoObjeto(form);

            const postagem = await this.postagemRepository.findOne(form.postagemId);
            if (!postagem) {
                return Promise.reject('Postagem inválida!')
            }
            console.log(comentario);

            const usuario = await this.usuarioRepository.findOne(form.usuarioId)
            if (!usuario) {
                return Promise.reject('Usuário inválido!')
            }

            if (form.parentId) {
                const parent = await this.comentarioRepository.findOne(form.parentId)
                if (!parent) return Promise.reject('Postagem pai inválida!')
                comentario.parent = parent
            }

            comentario.postagem = postagem
            comentario.usuario = usuario

            console.log(comentario);

            return this.comentarioRepository.save(comentario)

        } catch (error) {
            return Promise.reject(error)
        }
    }

    listar(): Promise<ComentarioEntity[]> {
        return this.comentarioRepository.find()
    }

    detalhar(id: string): Promise<ComentarioEntity> {
        return this.comentarioRepository.findOne(id)
    }

    async atualizar(id: any, comentarioAtualiza: ComentarioEntity): Promise<UpdateResult> {

        const comentario = await this.comentarioRepository.findOne(id)

        if (!comentario) return null;

        return this.comentarioRepository.update(id, comentarioAtualiza);
    }

    private populaNovoObjeto(form: ComentarioForm): ComentarioEntity {
        const comentario = new ComentarioEntity()
        comentario.conteudo = form.conteudo
        comentario.publicado = form.publicado
        comentario.criadoEm = new Date()
        if (form.publicado) {
            comentario.publicadoEm = new Date()
        }
        return comentario;
    }
}