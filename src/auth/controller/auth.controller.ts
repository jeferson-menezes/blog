import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { UsuarioEntity } from 'src/usuario/model/usuario.entity';
import { AuthModel } from '../model/auth.model';
import { AuthService } from '../service/auth.service';

@Controller('v1/auth')
export class AuthController {

    constructor(private authService: AuthService) { }

    @Post('login')
    async login(@Res() res: Response, @Body() user: AuthModel) {
        try {
            const acesso = await this.authService.login(user)
            res.status(HttpStatus.OK).json(acesso)
        } catch (error) {
            res.status(HttpStatus.NOT_FOUND).json(error)
        }
    }

    @Post('register')
    register(@Body() user: UsuarioEntity) {
        return this.authService.register(user)
    }
}