import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { ComentarioEntity } from '../model/comentario.entity';

@Injectable()
export class ComentarioService {

    constructor(@InjectRepository(ComentarioEntity)
    private comentarioRepository: Repository<ComentarioEntity>) { }

    adicionar(comentario: ComentarioEntity): Promise<ComentarioEntity> {
        return this.comentarioRepository.save(comentario)
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
}