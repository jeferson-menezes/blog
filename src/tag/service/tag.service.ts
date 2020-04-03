import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { TagEntity } from '../model/tag.entity';

@Injectable()
export class TagService {

    constructor(@InjectRepository(TagEntity)
    private tagRepository: Repository<TagEntity>) { }

    adicionar(tag: TagEntity): Promise<TagEntity> {
        return this.tagRepository.save(tag)
    }

    listar(): Promise<TagEntity[]> {
        return this.tagRepository.find()
    }

    detalhar(id: string): Promise<TagEntity> {
        return this.tagRepository.findOne(id)
    }

    async atualizar(id: any, tagAtualiza: TagEntity): Promise<UpdateResult> {

        const tag = await this.tagRepository.findOne(id)

        if (!tag) return null;

        return this.tagRepository.update(id, tagAtualiza);
    }
}