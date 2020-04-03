import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostagemEntity } from './model/postagem.entity';
import { PostagemService } from './service/postagem.service';
import { PostagemController } from './controller/postagem.controller';

@Module({
    imports: [TypeOrmModule.forFeature([PostagemEntity])],
    providers: [PostagemService],
    controllers: [PostagemController]
})
export class PostagemModule { }
