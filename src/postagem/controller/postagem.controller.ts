import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { PostagemEntity } from '../model/postagem.entity';
import { PostagemService } from '../service/postagem.service';

@Controller('v1/postagens')
export class PostagemController {
    
    constructor(private readonly postagemService: PostagemService) { }

    @Post()
    async adiciona(@Body() postagem: PostagemEntity) {
        return this.postagemService.adicionar(postagem)
    }

    @Get()
    async lista() {
        return this.postagemService.listar()
    }

    @Get(':id')
    async detalha(@Param('id') id) {
        return this.postagemService.detalhar(id)
    }

    @Put(':id')
    async atualiza(@Param('id') id, @Body() postagem: PostagemEntity) {
        return this.postagemService.atualizar(id, postagem)
    }
}