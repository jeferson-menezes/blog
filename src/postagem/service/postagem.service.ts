import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { PostagemEntity } from '../model/postagem.entity';

@Injectable()
export class PostagemService {

    constructor(@InjectRepository(PostagemEntity)
    private postagemRepository: Repository<PostagemEntity>) { }

    adicionar(postagem: PostagemEntity): Promise<PostagemEntity> {
        return this.postagemRepository.save(postagem)
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
}