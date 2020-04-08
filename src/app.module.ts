import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { winstonConsoleFormat, WinstonModule } from '@payk/nestjs-winston';
import * as winston from 'winston';
import { AcessoModule } from './acesso/acesso.module';
import { AuthModule } from './auth/auth.module';
import { AutorModule } from './autor/autor.module';
import { AutorEntity } from './autor/model/autor.entity';
import { CategoriaModule } from './categoria/categoria.module';
import { CategoriaEntity } from './categoria/model/categoria.entity';
import { ComentarioModule } from './comentario/comentario.module';
import { ComentarioEntity } from './comentario/model/comentario.entity';
import { LeituraModule } from './leitura/leitura.module';
import { LeituraEntity } from './leitura/model/leitura.entity';
import { LoggerModule } from './logger/logger.module';
import { PostagemMetaEntity } from './postagem-meta/model/postagem.meta.entity';
import { PostagemMetaModule } from './postagem-meta/postagem-meta.module';
import { PostagemEntity } from './postagem/model/postagem.entity';
import { PostagemModule } from './postagem/postagem.module';
import { TagEntity } from './tag/model/tag.entity';
import { TagModule } from './tag/tag.module';
import { UsuarioEntity } from './usuario/model/usuario.entity';
import { UsuarioModule } from './usuario/usuario.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'blog',
      entities: [
        CategoriaEntity,
        TagEntity,
        UsuarioEntity,
        AutorEntity,
        PostagemMetaEntity,
        ComentarioEntity,
        PostagemEntity,
        LeituraEntity
      ],
      subscribers: [],
      synchronize: true,
    }),
    WinstonModule.forRoot({
      level: 'verbose',
      format: winston.format.combine(
        winston.format.timestamp(),
        winstonConsoleFormat,
        winston.format.json()
      ),
      transports: [
        new winston.transports.File({
          filename: 'application.log',
          dirname: 'logs',
          maxsize: 1000000,
          maxFiles: 10
        })
      ]
    }),
    UsuarioModule,
    AcessoModule,
    AutorModule,
    CategoriaModule,
    ComentarioModule,
    PostagemModule,
    PostagemMetaModule,
    TagModule,
    LeituraModule,
    LoggerModule,
    AuthModule
  ]
})
export class AppModule { }
