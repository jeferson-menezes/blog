import { Body, Controller, Post, Get, Param, Put } from '@nestjs/common';
import { AutorEntity } from '../model/autor.entity';
import { AutorService } from '../service/autor.service';

@Controller('v1/autores')
export class AutorController {

    constructor(private readonly autorService: AutorService) { }

    @Post()
    async adiciona(@Body() autor: AutorEntity) {
        return this.autorService.adicionar(autor)
    }

    @Get()
    async lista() {
        return this.autorService.listar()
    }

    @Get(':id')
    async detalha(@Param('id') id) {
        return this.autorService.detalhar(id)
    }

    @Put(':id')
    async atualiza(@Param('id') id, @Body() autor: AutorEntity) {
        return this.autorService.atualizar(id, autor)
    }
}