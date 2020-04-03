import { Module } from '@nestjs/common';
import { ComentarioController } from './controller/comentario.controller';
import { ComentarioEntity } from './model/comentario.entity';
import { ComentarioService } from './service/comentario.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioModule } from 'src/usuario/usuario.module';
import { PostagemModule } from 'src/postagem/postagem.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([ComentarioEntity]),
        UsuarioModule,
        PostagemModule],
    providers: [ComentarioService],
    controllers: [ComentarioController]
})
export class ComentarioModule { }
