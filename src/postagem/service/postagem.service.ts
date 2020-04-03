import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection, Repository, UpdateResult } from 'typeorm';
import { PostagemEntity } from '../model/postagem.entity';
import { AutorEntity } from 'src/autor/model/autor.entity';
import { PostagemForm } from '../model/postagem.form';
import { CategoriaEntity } from 'src/categoria/model/categoria.entity';
import { TagEntity } from 'src/tag/model/tag.entity';

@Injectable()
export class PostagemService {

    constructor(@InjectRepository(PostagemEntity)
    private postagemRepository: Repository<PostagemEntity>) { }

    async adicionar(form: PostagemForm): Promise<any> {

        const connection = getConnection()
        const queryRunner = connection.createQueryRunner()
        await queryRunner.connect()

        await queryRunner.startTransaction()

        try {

            console.log(form);
            

            const postagem = this.populaNovoObjeto(form)

            const autor = await queryRunner.manager.findOne(AutorEntity, form.autorId)
            if (!autor)
                return Promise.reject('Autor inválido')
            postagem.autor = autor

            const categorias = await queryRunner.manager.findByIds(CategoriaEntity, form.categoriasId)
            if (!categorias.length)
                return Promise.reject('Não foi informado nenhuma categoria')
            postagem.categorias = categorias

            if (form.tagsId.length) {
                const tags = await queryRunner.manager.findByIds(TagEntity, form.tagsId)
                postagem.tags = tags
            }

            if (form.parentId) {
                const parent = await queryRunner.manager.findOne(PostagemEntity, form.parentId)
                if (!parent)
                    return Promise.reject('Postagem pai inválida!')
                postagem.parent = parent
            }

            await queryRunner.manager.save(postagem)
            return Promise.resolve(postagem);

        } catch (error) {
            await queryRunner.rollbackTransaction();
            return Promise.reject(error)
        } finally {
            await queryRunner.release()
        }
    }

    listar(): Promise<PostagemEntity[]> {
        return this.postagemRepository.find()
    }

    detalhar(id: string): Promise<PostagemEntity> {
        return this.postagemRepository.findOne(id)
    }

    async atualizar(id: any, postagemAtualiza: PostagemEntity): Promise<UpdateResult> {

        const postagem = await this.postagemRepository.findOne(id)

        if (!postagem) return null;

        return this.postagemRepository.update(id, postagemAtualiza);
    }

    private populaNovoObjeto(form: PostagemForm): PostagemEntity {
        const postagem = new PostagemEntity()
        postagem.titulo = form.titulo
        postagem.metaTitulo = form.metaTitulo
        postagem.slug = form.slug
        postagem.sumario = form.sumario
        postagem.conteudo = form.conteudo
        postagem.criadoEm = new Date()
        postagem.publicado = form.publicado
        if (form.publicado) {
            postagem.publicadoEm = new Date()
        }
        return postagem;
    }
}