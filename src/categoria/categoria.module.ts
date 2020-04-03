import { Module } from '@nestjs/common';
import { CategoriaEntity } from './model/categoria.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriaService } from './service/categoria.service';
import { CategoriaController } from './controller/categoria.controller';

@Module({
    imports:[TypeOrmModule.forFeature([CategoriaEntity])],
    providers:[CategoriaService],
    controllers:[CategoriaController]
})
export class CategoriaModule {}
