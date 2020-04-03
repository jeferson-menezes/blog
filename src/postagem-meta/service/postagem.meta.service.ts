import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { PostagemMetaEntity } from '../model/postagem.meta.entity';

@Injectable()
export class PostagemMetaService {

    constructor(@InjectRepository(PostagemMetaEntity)
    private postagemMetaRepository: Repository<PostagemMetaEntity>) { }

    adicionar(postagemMeta: PostagemMetaEntity): Promise<PostagemMetaEntity> {
        return this.postagemMetaRepository.save(postagemMeta)
    }

    listar(): Promise<PostagemMetaEntity[]> {
        return this.postagemMetaRepository.find()
    }

    detalhar(id: string): Promise<PostagemMetaEntity> {
        return this.postagemMetaRepository.findOne(id)
    }

    async atualizar(id: any, postagemMetaAtualiza: PostagemMetaEntity): Promise<UpdateResult> {

        const postagemMeta = await this.postagemMetaRepository.findOne(id)

        if (!postagemMeta) return null;

        return this.postagemMetaRepository.update(id, postagemMetaAtualiza);
    }
}