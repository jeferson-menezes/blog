import { Body, Controller, HttpStatus, Post, Res, Param, Get } from '@nestjs/common';
import { Response } from 'express';
import { UsuarioEntity } from 'src/usuario/model/usuario.entity';
import { AuthModel } from '../model/auth.model';
import { AuthService } from '../service/auth.service';

@Controller('auth')
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
    async  register(@Res() res: Response, @Body() user: UsuarioEntity) {
        try {
            const promessa = await this.authService.register(user)
            res.status(HttpStatus.CREATED).json(promessa)
        } catch (error) {
            res.status(HttpStatus.NOT_FOUND).json(error)
        }
    }

    @Get('valid/:token')
    async valida(@Res() res: Response, @Param('token') token: string) {
        try {
            const promessa = await this.authService.verify(token)
            res.json(promessa)
        } catch (error) {
            res.status(HttpStatus.UNAUTHORIZED).json(error)
        }
    }
}