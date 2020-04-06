/* eslint-disable @typescript-eslint/camelcase */
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuarioService } from 'src/usuario/service/usuario.service';
import { Crypt } from '../../shared/seguranca/usuario.crypt';
import { AuthModel } from '../model/auth.model';
import { UsuarioEntity } from 'src/usuario/model/usuario.entity';

@Injectable()
export class AuthService {

    constructor(
        private usuarioService: UsuarioService,
        private jwtService: JwtService) { }

    async login(user: AuthModel): Promise<any> {

        const { email, senha } = user

        const usuario = await this.validate(email)

        if (!usuario)
            return Promise.reject('Usuário inválido!')

        if (!await Crypt.compara(senha, usuario.senha))
            return Promise.reject('Senha inválida!')

        const accessToken = this.jwtService.sign({ id: usuario.id })
        usuario.senha = undefined
        return Promise.resolve({
            expires_in: 3600,
            token: accessToken,
            user: usuario,
            status: 200
        })

    }

    private async validate(email: string): Promise<UsuarioEntity> {
        return await this.usuarioService.findByEmail(email)
    }

    async register(user: UsuarioEntity) {
        return await this.usuarioService.save(user)
    }

    verify(token: string, options?: any) {
        return this.jwtService.verify(token, options)
    }
}
