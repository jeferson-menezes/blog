import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection, Repository, UpdateResult, Like } from 'typeorm';
import { PostagemEntity } from '../model/postagem.entity';
import { AutorEntity } from 'src/autor/model/autor.entity';
import { PostagemForm } from '../model/postagem.form';
import { CategoriaEntity } from 'src/categoria/model/categoria.entity';
import { TagEntity } from 'src/tag/model/tag.entity';
import { Paginacao } from 'src/shared/model/paginacao';

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

            await queryRunner.manager.save<PostagemEntity>(postagem)
            await queryRunner.commitTransaction();
            return Promise.resolve(postagem);

        } catch (error) {
            await queryRunner.rollbackTransaction();
            return Promise.reject(error)
        } finally {
            await queryRunner.release()
        }
    }

    async  listarPaginado(size: number, page: number): Promise<Paginacao> {

        const offset = page * size
        const resultados = await this.postagemRepository
            .createQueryBuilder('post')
            .skip(offset)
            .take(size)
            .getMany()

        const total = await this.postagemRepository
            .createQueryBuilder('post')
            .getCount()

        const totalPages = Math.ceil(total / size)

        const paginacao = new Paginacao(size, page, total, totalPages, resultados)
        return Promise.resolve(paginacao)
    }
    listarPorCategorias(ids: number[]): any {
        return this.postagemRepository
            .createQueryBuilder('p')
            .distinctOn(['p.id'])
            .leftJoin('p.categorias', 'pc')
            .where('pc.id IN (:...ids)', { ids: ids })
            .limit(10)
            .getMany()
    }

    listarPorTitulo(nome: string): any {
        return this.postagemRepository
            .find({ titulo: Like(`%${nome}%`) })
    }
    detalhar(id: string): Promise<PostagemEntity> {
        return this.postagemRepository.findOne(id)
    }

    async atualizar(id: any, formAtualiza: PostagemForm): Promise<any> {
        const connection = getConnection()
        const queryRunner = connection.createQueryRunner()
        await queryRunner.connect()

        await queryRunner.startTransaction()

        try {
            const postagem = await queryRunner.manager.findOne(PostagemEntity, id)
            if (!postagem)
                return Promise.reject('Postagem inválida')

            this.atualizaObjeto(formAtualiza, postagem)

            const autor = await queryRunner.manager.findOne(AutorEntity, formAtualiza.autorId)
            if (!autor)
                return Promise.reject('Autor inválido')
            postagem.autor = autor

            const categorias = await queryRunner.manager.findByIds(CategoriaEntity, formAtualiza.categoriasId)
            if (!categorias.length)
                return Promise.reject('Não foi informado nenhuma categoria')
            postagem.categorias = categorias


            const tags = await queryRunner.manager.findByIds(TagEntity, formAtualiza.tagsId)
            postagem.tags = tags


            const parent = await queryRunner.manager.findOne(PostagemEntity, formAtualiza.parentId)
            postagem.parent = parent

            const resultados = await queryRunner.manager.save<PostagemEntity>(postagem);
            await queryRunner.commitTransaction();
            return Promise.resolve(resultados);

        } catch (error) {
            await queryRunner.rollbackTransaction();
            return Promise.reject(error)
        } finally {
            await queryRunner.release()
        }
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

    private atualizaObjeto(form: PostagemForm, postagem: PostagemEntity) {
        postagem.titulo = form.titulo
        postagem.metaTitulo = form.metaTitulo
        postagem.slug = form.slug
        postagem.sumario = form.sumario
        postagem.conteudo = form.conteudo
        postagem.publicado = form.publicado
        postagem.alteradoEm = new Date()
        if (form.publicado) {
            postagem.publicadoEm = null
        }
    }
}