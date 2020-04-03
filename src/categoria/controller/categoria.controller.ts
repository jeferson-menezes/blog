import { Controller, Body, Post, Get, Param, Put, Res, HttpStatus } from '@nestjs/common';
import { CategoriaService } from '../service/categoria.service';
import { CategoriaEntity } from '../model/categoria.entity';
import { Response } from 'express';
import { Mensagem } from 'src/shared/model/mensagem';

@Controller('v1/categorias')
export class CategoriaController {
    constructor(private readonly categoriaService: CategoriaService) { }

    @Post()
    async adiciona(@Body() categoria: CategoriaEntity) {
        return this.categoriaService.adicionar(categoria)
    }

    @Get()
    async lista() {
        return this.categoriaService.listar()
    }

    @Get(':id')
    async detalha(@Res() res: Response, @Param('id') id) {
        const promessa = await this.categoriaService.detalhar(id)
        if (!promessa) res.status(HttpStatus.BAD_REQUEST).json(new Mensagem('Categoria inválida'))
        res.json(promessa)
    }

    @Put(':id')
    async atualiza(@Res() res: Response, @Param('id') id, @Body() categoria: CategoriaEntity) {
        const promessa = await this.categoriaService.atualizar(id, categoria)
        if (!promessa) res.status(HttpStatus.BAD_REQUEST).json(new Mensagem('Categoria inválida!'));
        res.json(new Mensagem('Categoria atualizado com sucesso!'))
    }
}