import { Module } from '@nestjs/common';
import { MeuLogger } from './service/meu-logger';

@Module({
    providers: [MeuLogger],
    exports: [MeuLogger]
})
export class LoggerModule { }
