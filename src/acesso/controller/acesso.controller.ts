import { Controller, Post, Ip } from '@nestjs/common';

@Controller('v1/acesso')
export class AcessoController {

    @Post()
    create(@Ip() ip: any) {
        return ip;
    }
}