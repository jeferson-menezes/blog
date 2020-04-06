import { Body, Controller, Get, Post, Res, HttpStatus } from '@nestjs/common';
import { UsuarioEntity } from '../model/usuario.entity';
import { UsuarioService } from '../service/usuario.service';
import { Mensagem } from 'src/shared/model/mensagem';
import { Response } from 'express';

@Controller('v1/usuarios')
export class UsuarioController {

    constructor(private readonly usuarioService: UsuarioService) { }

    @Post()
    async create(@Body() usuario: UsuarioEntity) {
        const user = await this.usuarioService.findByEmail(usuario.email)

        if (user) {
            return new Mensagem("email já cadastrado!")
        }

        return this.usuarioService.save(usuario);
    }

    @Get()
    async get(@Res() res: any) {
        console.log("Id: ", res.id);
        try {

            const usuarios = await this.usuarioService.findAll();
            res.json(usuarios)
        } catch (error) {
            res.status(HttpStatus.NOT_FOUND).json()
        }
    }
}