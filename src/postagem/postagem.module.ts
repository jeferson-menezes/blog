import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostagemEntity } from './model/postagem.entity';
import { PostagemService } from './service/postagem.service';
import { PostagemController } from './controller/postagem.controller';
import { AutorModule } from 'src/autor/autor.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([PostagemEntity]),
        AutorModule],
    providers: [PostagemService],
    controllers: [PostagemController],
    exports: [TypeOrmModule]
})
export class PostagemModule { }
