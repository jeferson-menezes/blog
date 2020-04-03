import { Module } from '@nestjs/common';
import { UsuarioModule } from './usuario/usuario.module';
import { TypeOrmModule } from '@nestjs/typeorm'
import { UsuarioEntity } from './usuario/model/usuario.entity';
import { UsuarioSubscriber } from './usuario/model/usuario.subscriber';
import { AcessoModule } from './acesso/acesso.module';
import { AutorModule } from './autor/autor.module';
import { AutorEntity } from './autor/model/autor.entity';
import { CategoriaModule } from './categoria/categoria.module';
import { CategoriaEntity } from './categoria/model/categoria.entity';
import { ComentarioModule } from './comentario/comentario.module';
import { ComentarioEntity } from './comentario/model/comentario.entity';
import { PostagemModule } from './postagem/postagem.module';
import { PostagemEntity } from './postagem/model/postagem.entity';
import { PostagemMetaModule } from './postagem-meta/postagem-meta.module';
import { TagModule } from './tag/tag.module';
import { PostagemMetaEntity } from './postagem-meta/model/postagem.meta.entity';
import { TagEntity } from './tag/model/tag.entity';
import { LeituraModule } from './leitura/leitura.module';
import { LeituraEntity } from './leitura/model/leitura.entity';

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
      subscribers: [UsuarioSubscriber],
      synchronize: true,
    }),
    UsuarioModule,
    AcessoModule,
    AutorModule,
    CategoriaModule,
    ComentarioModule,
    PostagemModule,
    PostagemMetaModule,
    TagModule,
    LeituraModule
  ]
})
export class AppModule { }
