import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { TagEntity } from '../model/tag.entity';
import { TagService } from '../service/tag.service';

@Controller('tags')
export class TagController {
    constructor(private readonly tagService: TagService) { }

    @Post()
    async adiciona(@Body() categoria: TagEntity) {
        return this.tagService.adicionar(categoria)
    }

    @Get()
    async lista() {
        return this.tagService.listar()
    }

    @Get(':id')
    async detalha(@Param('id') id) {
        return this.tagService.detalhar(id)
    }

    @Put(':id')
    async atualiza(@Param('id') id, @Body() categoria: TagEntity) {
        return this.tagService.atualizar(id, categoria)
    }
}