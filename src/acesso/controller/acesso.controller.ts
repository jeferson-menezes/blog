import { Controller, Post, Ip } from '@nestjs/common';

@Controller('acesso')
export class AcessoController {

    @Post()
    create(@Ip() ip: any) {
        return ip;
    }
}