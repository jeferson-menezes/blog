import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AutorEntity } from './model/autor.entity';
import { AutorController } from './controller/autor.controller';
import { AutorService } from './service/autor.service';
import { LoggerModule } from 'src/logger/logger.module';

@Module({
    imports: [TypeOrmModule.forFeature([AutorEntity]), LoggerModule],
    providers: [AutorService],
    controllers: [AutorController]
})
export class AutorModule { }
