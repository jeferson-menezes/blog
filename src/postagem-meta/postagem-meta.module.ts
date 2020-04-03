import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostagemMetaController } from './controller/postagem.meta.controller';
import { PostagemMetaEntity } from './model/postagem.meta.entity';
import { PostagemMetaService } from './service/postagem.meta.service';

@Module({
    imports: [TypeOrmModule.forFeature([PostagemMetaEntity])],
    providers: [PostagemMetaService],
    controllers: [PostagemMetaController]
})
export class PostagemMetaModule { }
