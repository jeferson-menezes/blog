import { Body, Controller, Get, Param, Post, Put, Res, HttpStatus } from '@nestjs/common';
import { AutorEntity } from '../model/autor.entity';
import { AutorService } from '../service/autor.service';
import { Response } from 'express'
import { Mensagem } from 'src/shared/model/mensagem';

@Controller('autores')
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
    async detalha(@Res() res: Response, @Param('id') id) {
        const promessa = await this.autorService.detalhar(id)
        if (!promessa) res.status(HttpStatus.BAD_REQUEST).json(new Mensagem('Autor inválido!'));
        res.json(promessa)
    }

    @Put(':id')
    async atualiza(@Res() res: Response, @Param('id') id, @Body() autor: AutorEntity) {
        const promessa = await this.autorService.atualizar(id, autor)
        if (!promessa) res.status(HttpStatus.BAD_REQUEST).json(new Mensagem('Autor inválido!'));
        res.json(new Mensagem('Autor atualizado com sucesso!'))
    }
}