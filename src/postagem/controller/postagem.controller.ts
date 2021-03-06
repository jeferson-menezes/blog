import { Body, Controller, Get, HttpStatus, Param, Post, Put, Res, Query } from '@nestjs/common';
import { Response } from 'express';
import { Mensagem } from 'src/shared/model/mensagem';
import { PostagemForm } from '../model/postagem.form';
import { PostagemService } from '../service/postagem.service';

@Controller('postagens')
export class PostagemController {

    constructor(private readonly postagemService: PostagemService) { }

    @Post()
    async adiciona(@Res() res: Response, @Body() postagem: PostagemForm) {
        try {
            const promessa = await this.postagemService.adicionar(postagem)
            res.status(HttpStatus.CREATED).json(promessa)
        } catch (error) {
            res.status(HttpStatus.BAD_REQUEST).json(error);
        }
    }

    @Get(':size/:page')
    async lista(@Param('size') size: number, @Param('page') page: number) {
        return this.postagemService.listarPaginado(Number(size), Number(page))
    }

    @Get(':id')
    async detalha(@Res() res: Response, @Param('id') id) {
        const promessa = await this.postagemService.detalhar(id)
        if (!promessa) res.status(HttpStatus.BAD_REQUEST).json(new Mensagem('Postagem inválido!'))
        res.json(promessa)
    }

    @Put(':id')
    async atualiza(@Res() res: Response, @Param('id') id, @Body() form: PostagemForm) {
        const promessa = await this.postagemService.atualizar(id, form)
        if (!promessa) res.status(HttpStatus.BAD_REQUEST).json(new Mensagem('Postagem inválida!'));
        res.json(new Mensagem('Postagem atualizada com sucesso!'))
    }

    @Get('lista/categorias/:categoriasId')
    async listarPorCategorias(@Param('categoriasId') categoriasId: string) {
        const arr = categoriasId.split(',').map(Number)
        return this.postagemService.listarPorCategorias(arr)
    }

    @Get('lista/titulo/:titulo')
    async listarPorTitulo(@Param('titulo') titulo: string) {
        return this.postagemService.listarPorTitulo(titulo)
    }
}