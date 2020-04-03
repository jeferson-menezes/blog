import { Module } from '@nestjs/common';
import { ComentarioController } from './controller/comentario.controller';
import { ComentarioEntity } from './model/comentario.entity';
import { ComentarioService } from './service/comentario.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports:[TypeOrmModule.forFeature([ComentarioEntity])],
    providers:[ComentarioService],
    controllers:[ComentarioController]
})
export class ComentarioModule {}
