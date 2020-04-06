import { Body, Controller, Res, HttpStatus, Post, Param, Get } from '@nestjs/common';
import { Response } from 'express';
import { LeituraService } from '../service/leitura.service';
import { LeituraForm } from '../model/leitura.form';

@Controller('v1/leituras')
export class LeituraController {

    constructor(private readonly leituraService: LeituraService) { }


    @Post()
    async adiciona(@Res() res: Response, @Body() form: LeituraForm) {

        try {
            const leitura = await this.leituraService.adicionar(form)
            res.status(HttpStatus.CREATED).json(leitura)
        } catch (error) {
            res.status(HttpStatus.BAD_REQUEST).json(error);
        }
    }

    @Get('usuario/:id')
    async listaPorUsuario(@Res() res: Response, @Param('id') id: number) {

        try {
            const leituras = await this.leituraService.listarPorUsuario(id)
            res.json(leituras)
        } catch (error) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error);
        }
    }

    @Get('postagem/:id')
    async listaPorPostagem(@Res() res: Response, @Param('id') id: number) {

        try {
            const leituras = await this.leituraService.listarPorPostagem(id)
            res.json(leituras)
        } catch (error) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error);
        }
    }

    @Get(':dataInicio/:dataFim')
    async listarPorPeriodo(@Res() res: Response,
        @Param('dataInicio') dataInicio: string,
        @Param('dataFim') dataFim: string) {
        try {
            const leituras = await this.leituraService.listarPorPeriodo(dataInicio, dataFim)
            res.json(leituras)
        } catch (error) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error);
        }
    }

}