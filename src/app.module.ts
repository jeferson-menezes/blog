import { Module } from '@nestjs/common';
import { UsuarioModule } from './usuario/usuario.module';
import { TypeOrmModule } from '@nestjs/typeorm'
import { UsuarioEntity } from './usuario/model/usuario.entity';
import { UsuarioSubscriber } from './usuario/model/usuario.subscriber';
import { AcessoModule } from './acesso/acesso.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'blog_db',
      entities: [UsuarioEntity],
      subscribers:[UsuarioSubscriber],
      synchronize: true,
    }),
    UsuarioModule,
    AcessoModule
  ]
})
export class AppModule { }
