import { Controller, Body, Post, Get, Param, Put } from '@nestjs/common';
import { CategoriaService } from '../service/categoria.service';
import { CategoriaEntity } from '../model/categoria.entity';

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
    async detalha(@Param('id') id) {
        return this.categoriaService.detalhar(id)
    }

    @Put(':id')
    async atualiza(@Param('id') id, @Body() categoria: CategoriaEntity) {
        return this.categoriaService.atualizar(id, categoria)
    }
}