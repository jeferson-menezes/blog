import { Module } from '@nestjs/common';
import { AcessoController } from './controller/acesso.controller';

@Module({
    controllers:[AcessoController]
})
export class AcessoModule {}
