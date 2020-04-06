import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LeituraController } from './controller/leitura.controller';
import { LeituraService } from './service/leitura.service';
import { LeituraEntity } from './model/leitura.entity';
import { UsuarioModule } from 'src/usuario/usuario.module';
import { PostagemModule } from 'src/postagem/postagem.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([LeituraEntity]),
        UsuarioModule,
        PostagemModule
    ],
    providers: [LeituraService],
    controllers: [LeituraController]
})
export class LeituraModule { }
