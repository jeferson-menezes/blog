import { Controller } from '@nestjs/common';
import { LeituraService } from '../service/leitura.service';

@Controller('v1/leituras')
export class LeituraController{

    constructor(private readonly leituraService: LeituraService) { }

}