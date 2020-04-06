import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Mensagem } from 'src/shared/model/mensagem';
import { Repository } from 'typeorm';
import { AutorEntity } from '../model/autor.entity';
import { MeuLogger } from 'src/logger/service/meu-logger';

@Injectable()
export class AutorService {

    constructor(@InjectRepository(AutorEntity)

    private autorRepository: Repository<AutorEntity>,
        private meuLogger: MeuLogger) {
        this.meuLogger.setContext(AutorEntity.name)
    }

    adicionar(autor: AutorEntity): Promise<AutorEntity> {
        this.meuLogger.log("Testando o log")
        return this.autorRepository.save(autor)
    }

    listar(): Promise<AutorEntity[]> {
        return this.autorRepository.find()
    }

    detalhar(id: string): Promise<AutorEntity> {
        return this.autorRepository.findOne(id)
    }

    async atualizar(id: any, autorAtualiza: AutorEntity): Promise<any> {
        const autor = await this.autorRepository.findOne(id)
        if (!autor) return null;
        return this.autorRepository.update(id, autorAtualiza);
    }
}