/* eslint-disable @typescript-eslint/camelcase */
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Mensagem } from 'src/shared/model/mensagem';
import { UsuarioEntity } from 'src/usuario/model/usuario.entity';
import { UsuarioService } from 'src/usuario/service/usuario.service';
import { Crypt } from '../../shared/seguranca/usuario.crypt';
import { AuthModel } from '../model/auth.model';

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

        const payload = {
            expires_in: "24h",
            token: accessToken,
            usuario: usuario,
            status: 200
        }

        return Promise.resolve(payload)
    }

    private async validate(email: string): Promise<UsuarioEntity> {
        return await this.usuarioService.findByEmail(email)
    }

    async register(user: UsuarioEntity) {
        return await this.usuarioService.save(user)
    }

    async verify(token: string) {

        try {

            const decoded = await this.jwtService.verifyAsync(token)
            const { id } = decoded

            const usuario = await this.usuarioService.detalhar(id)
            if (!usuario)
                return Promise.reject(new Mensagem('Usuário inválido!'))
            usuario.senha = undefined
            const payload = {
                expires_in: "24h",
                token: token,
                usuario: usuario,
                status: 200
            }

            return Promise.resolve(payload)

        } catch (error) {
            return Promise.reject(error)
        }
    }

}
