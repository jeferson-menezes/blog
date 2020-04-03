import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { PostagemMetaEntity } from '../model/postagem.meta.entity';
import { PostagemMetaService } from '../service/postagem.meta.service';

@Controller('v1/postagem/metas')
export class PostagemMetaController {

    constructor(private readonly postagemMetaService: PostagemMetaService) { }

    @Post()
    async adiciona(@Body() postagemMeta: PostagemMetaEntity) {
        return this.postagemMetaService.adicionar(postagemMeta)
    }

    @Get()
    async lista() {
        return this.postagemMetaService.listar()
    }

    @Get(':id')
    async detalha(@Param('id') id) {
        return this.postagemMetaService.detalhar(id)
    }

    @Put(':id')
    async atualiza(@Param('id') id, @Body() postagemMeta: PostagemMetaEntity) {
        return this.postagemMetaService.atualizar(id, postagemMeta)
    }
}