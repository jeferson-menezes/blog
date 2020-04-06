import { Injectable } from '@nestjs/common';
import { LeituraEntity } from '../model/leitura.entity';
import { Repository, Between } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { LeituraForm } from '../model/leitura.form';
import { PostagemEntity } from 'src/postagem/model/postagem.entity';
import { UsuarioEntity } from 'src/usuario/model/usuario.entity';

@Injectable()
export class LeituraService {

    constructor(
        @InjectRepository(LeituraEntity) private leituraRepository: Repository<LeituraEntity>,
        @InjectRepository(PostagemEntity) private postagemRepository: Repository<PostagemEntity>,
        @InjectRepository(UsuarioEntity) private usuarioRepository: Repository<UsuarioEntity>) { }

    async adicionar(form: LeituraForm): Promise<LeituraEntity> {

        const leitura = this.populaNovoObjeto(form)

        const postagem = await this.postagemRepository.findOne(form.postagemId);
        if (!postagem) return Promise.reject('Postagem inválida!')
        leitura.postagem = postagem

        if (form.usuarioId) {
            const usuario = await this.usuarioRepository.findOne(form.usuarioId)
            if (!usuario) return Promise.reject('Postagem inválida!')
            leitura.usuario = usuario
        }

        await this.leituraRepository.save(leitura)
        leitura.usuario = undefined
        leitura.postagem = undefined
        return Promise.resolve(leitura)
    }

    listarPorUsuario(usuarioId: number): Promise<LeituraEntity[]> {
        return this.leituraRepository
            .createQueryBuilder('l')
            .where("l.usuario.id = :id", { id: usuarioId }).getMany()
    }

    listarPorPostagem(postagemId: number): Promise<LeituraEntity[]> {
        return this.leituraRepository
            .createQueryBuilder('l')
            .where("l.postagem.id = :id", { id: postagemId }).getMany()
    }

    listarPorPeriodo(dataInicio: string, dataFim: string): Promise<LeituraEntity[]> {
        return this.leituraRepository.find({
            data: Between(dataInicio, dataFim)
        })
    }

    private populaNovoObjeto(form: LeituraForm) {
        const leitura = new LeituraEntity()
        leitura.tempo = form.tempo
        leitura.data = new Date()
        return leitura;
    }
}