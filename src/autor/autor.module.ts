import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AutorEntity } from './model/autor.entity';
import { AutorController } from './controller/autor.controller';
import { AutorService } from './service/autor.service';

@Module({
    imports:[TypeOrmModule.forFeature([AutorEntity])],
    providers:[AutorService],
    controllers:[AutorController]
})
export class AutorModule {}
