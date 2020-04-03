import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsuarioEntity } from '../model/usuario.entity';
import { UsuarioService } from '../service/usuario.service';
import { Mensagem } from 'src/shared/model/mensagem';

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
    async get(): Promise<UsuarioEntity[]> {
        return this.usuarioService.findAll();
    }
}