import { Injectable } from '@nestjs/common';
import { LeituraEntity } from '../model/leitura.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class LeituraService {

    constructor(@InjectRepository(LeituraEntity) private leituraRepository: Repository<LeituraEntity>){ }
}