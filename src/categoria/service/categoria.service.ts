import { Injectable } from '@nestjs/common';
import { Repository, UpdateResult } from 'typeorm';
import { CategoriaEntity } from '../model/categoria.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CategoriaService {

    constructor(@InjectRepository(CategoriaEntity)
    private categoriaRepository: Repository<CategoriaEntity>) { }

    adicionar(categoria: CategoriaEntity): Promise<CategoriaEntity> {
        return this.categoriaRepository.save(categoria)
    }

    listar(): Promise<CategoriaEntity[]> {
        return this.categoriaRepository.find()
    }

    detalhar(id: string): Promise<CategoriaEntity> {
        return this.categoriaRepository.findOne(id)
    }

    async atualizar(id: any, categoriaAtualiza: CategoriaEntity): Promise<UpdateResult> {

        const categoria = await this.categoriaRepository.findOne(id)

        if (!categoria) return null;

        return this.categoriaRepository.update(id, categoriaAtualiza);
    }
}