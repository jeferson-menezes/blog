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

    @Get('postagem/:id')
    async lista(@Res() res: Response, @Param('id') id: number) {
        try {
            const resultado = await this.comentarioService.listarPorPostagem(id)
            res.json(resultado)
        } catch (error) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    @Get(':id')
    async detalha(@Res() res: Response, @Param('id') id) {
        try {
            const promessa = await this.comentarioService.detalhar(id)
            res.json(promessa)
        } catch (error) {
            res.status(HttpStatus.BAD_REQUEST).json(error)
        }
    }

    @Put(':id')
    async atualiza(@Res() res: Response, @Param('id') id, @Body() comentario: ComentarioEntity) {
        try {
            const { conteudo } = comentario
            await this.comentarioService.atualizar(id, conteudo)
            res.json(new Mensagem('Comentário atualizado com sucesso!'))
        } catch (error) {
            res.status(HttpStatus.BAD_REQUEST).json(error);
        }
    }
}