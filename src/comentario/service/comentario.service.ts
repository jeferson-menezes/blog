import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostagemEntity } from 'src/postagem/model/postagem.entity';
import { UsuarioEntity } from 'src/usuario/model/usuario.entity';
import { Repository, UpdateResult } from 'typeorm';
import { ComentarioEntity } from '../model/comentario.entity';
import { ComentarioForm } from '../model/comentario.form';
import { Mensagem } from 'src/shared/model/mensagem';

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

            const usuario = await this.usuarioRepository.findOne(form.usuarioId)
            if (!usuario) {
                return Promise.reject('Usuário inválido!')
            }

            if (form.parentId) {
                const parent = await this.comentarioRepository.findOne(form.parentId)
                if (!parent) return Promise.reject('Comentario pai inválido!')
                comentario.parent = parent
            }

            comentario.postagem = postagem
            comentario.usuario = usuario
            await this.comentarioRepository.save(comentario)

            comentario.usuario = undefined
            comentario.postagem = undefined
            comentario.parent = undefined

            return Promise.resolve(comentario)

        } catch (error) {
            return Promise.reject(error)
        }
    }

    listarPorPostagem(postagemId: number): Promise<ComentarioEntity[]> {
        return this.comentarioRepository
            .createQueryBuilder('c')
            .where("c.postagem.id = :id", { id: postagemId }).getMany()
    }

    async detalhar(id: string): Promise<ComentarioEntity> {
        const promessa = await this.comentarioRepository.findOne(id)
        if (!promessa) return Promise.reject(new Mensagem('Comentário inválido!'))
        return Promise.resolve(promessa)
    }

    async atualizar(id: any, conteudo: string): Promise<UpdateResult> {

        const comentario = await this.comentarioRepository.findOne(id)
        if (!comentario) return Promise.reject(new Mensagem('Comentário inválido'));
        return this.comentarioRepository.update(id, { conteudo });
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