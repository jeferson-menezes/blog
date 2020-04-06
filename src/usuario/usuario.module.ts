import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioController } from './controller/usuario.controller';
import { UsuarioEntity } from './model/usuario.entity';
import { UsuarioService } from './service/usuario.service';

@Module({
    imports: [TypeOrmModule.forFeature([UsuarioEntity])],
    providers: [UsuarioService],
    controllers: [UsuarioController],
    exports: [TypeOrmModule, UsuarioService]
})
export class UsuarioModule { }
