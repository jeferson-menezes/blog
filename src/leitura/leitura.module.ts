import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LeituraController } from './controller/leitura.controller';
import { LeituraService } from './service/leitura.service';
import { LeituraEntity } from './model/leitura.entity';

@Module({
    imports: [TypeOrmModule.forFeature([LeituraEntity])],
    providers: [LeituraService],
    controllers: [LeituraController]
})
export class LeituraModule { }
