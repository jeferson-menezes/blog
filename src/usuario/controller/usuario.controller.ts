import { Body, Controller, Get, Param, Post, HttpStatus, Res } from '@nestjs/common';
import { Mensagem } from 'src/shared/model/mensagem';
import { UsuarioEntity } from '../model/usuario.entity';
import { UsuarioService } from '../service/usuario.service';
import { Response } from 'express';

@Controller('usuarios')
export class UsuarioController {

    constructor(private readonly usuarioService: UsuarioService) { }

    @Post()
    async create(@Res() res: Response, @Body() usuario: UsuarioEntity) {
        try {
            const promessa = await this.usuarioService.save(usuario);
            res.status(HttpStatus.CREATED).json(promessa)
        } catch (error) {
            res.status(HttpStatus.BAD_REQUEST).json(error)
        }
    }

    @Get(':size/:page')
    async lista(@Param('size') size: number, @Param('page') page: number) {
        return this.usuarioService.listarPaginado(Number(size), Number(page))
    }

    @Get(':id')
    async detalha(@Res() res: Response, @Param('id') id) {
        const promessa = await this.usuarioService.detalhar(id)
        if (!promessa) res.status(HttpStatus.BAD_REQUEST).json(new Mensagem('Comentário inválido!'))
        res.json(promessa)
    }
}