import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ComentarioEntity } from '../model/comentario.entity';
import { ComentarioService } from '../service/comentario.service';

@Controller('v1/comentarios')
export class ComentarioController {
    
    constructor(private readonly comentarioService: ComentarioService) { }

    @Post()
    async adiciona(@Body() comentario: ComentarioEntity) {
        return this.comentarioService.adicionar(comentario)
    }

    @Get()
    async lista() {
        return this.comentarioService.listar()
    }

    @Get(':id')
    async detalha(@Param('id') id) {
        return this.comentarioService.detalhar(id)
    }

    @Put(':id')
    async atualiza(@Param('id') id, @Body() comentario: ComentarioEntity) {
        return this.comentarioService.atualizar(id, comentario)
    }
}