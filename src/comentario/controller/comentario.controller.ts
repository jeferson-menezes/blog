import { Body, Controller, Get, Param, Post, Put, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { ComentarioEntity } from '../model/comentario.entity';
import { ComentarioService } from '../service/comentario.service';
import { Mensagem } from 'src/shared/model/mensagem';
import { ComentarioForm } from '../model/comentario.form';

@Controller('v1/comentarios')
export class ComentarioController {

    constructor(private readonly comentarioService: ComentarioService) { }

    @Post()
    async adiciona(@Res() res: Response, @Body() form: ComentarioForm) {
        try {
            const comentario = await this.comentarioService.adicionar(form)
            res.status(HttpStatus.CREATED).json(comentario)
        } catch (error) {
            res.status(HttpStatus.BAD_REQUEST).json(error);
        }
    }

    @Get()
    async lista() {
        return this.comentarioService.listar()
    }

    @Get(':id')
    async detalha(@Res() res: Response, @Param('id') id) {
        const promessa = await this.comentarioService.detalhar(id)
        if (!promessa) res.status(HttpStatus.BAD_REQUEST).json(new Mensagem('Comentário inválido!'))
        res.json(promessa)
    }

    @Put(':id')
    async atualiza(@Res() res: Response, @Param('id') id, @Body() comentario: ComentarioEntity) {
        const promessa = await this.comentarioService.atualizar(id, comentario)
        if (!promessa) res.status(HttpStatus.BAD_REQUEST).json(new Mensagem('Comentário inválido!'));
        res.json(new Mensagem('Comentário atualizado com sucesso!'))
    }
}